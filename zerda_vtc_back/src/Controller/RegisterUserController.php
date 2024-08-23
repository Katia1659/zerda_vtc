<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

class RegisterUserController extends AbstractController
{

    private $entityManager;
    private $userRepository;
    private $passwordHasher;
    private $JWTManager;

    private $validator;

    public function __construct(
        EntityManagerInterface $entityManager,
        UserRepository $userRepository,
        UserPasswordHasherInterface $passwordHasher,
        JWTTokenManagerInterface $JWTManager,
        ValidatorInterface $validator
    )
    {
        $this->entityManager=$entityManager;
        $this->userRepository=$userRepository;
        $this->passwordHasher=$passwordHasher;
        $this->JWTManager=$JWTManager;
        $this->validator = $validator;
    }

    #[Route('/user', name: 'register_user', methods:['POST'])]
    public function __invoke(Request $request):JsonResponse

    {
        //Handel file upload
        $photo = $request->files->get('photo');
        // tronsformet le contenue du request on un tableaux associative 
        $data = $request->request->all();

        if ($photo && $data ) {

            // Traitez le fichier, par exemple en le stockant
            $fileName = $this->validateAndStorePhoto($photo);

            $user = $this->createNewUser($data);

            $user->setPhotoProfile($fileName);

            $errors = $this->validator->validate($user);

            if (count($errors) > 0) {
                return $this->handleValidationErrors($errors);
            }

            $this->saveUser($user);

            $token = $this->JWTManager->create($user);


            return new JsonResponse(
                [
                    'message' => 'un nouvel utilisateur a été créer avec succée',
                    'token' => $token,
                ],
                JsonResponse::HTTP_CREATED
            );

        } else {
            $fileName = 'photo inexistant';
            $data = null;

            return new JsonResponse(
                [
                    'message' => 'photo inexistant et data null',
                    'request array'=> $request->toArray()
                ],
                JsonResponse::HTTP_NO_CONTENT);
        };
    }

    private function validateAndStorePhoto (UploadedFile $photo): ?string
    {
        // validate file type
        $allowedMimeTypes = ['image/jpeg', 'image/png'];

        
        if (!$photo->isValid() ||!in_array($photo->getClientMimeType(), $allowedMimeTypes))
        {
            throw new BadRequestHttpException("Invalid file type.");
        }

        //generate a unique filename and move the file
        $fileName=uniqid().'.'.$photo->guessExtension();
        $uploadDir = $this->getParameter('kernel.project_dir').'/public/assets';

        // Ensure the directory exists
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $photo->move($uploadDir, $fileName);

        return $fileName;
    }

    private function createNewUser( array $data ) 
    {
        // géré la création de notre token
        // $randomString = bin2hex((random_bytes(5)));
        // $timeStamp = time(); 
        // $token = $randomString.$timeStamp;

        $birthdatString = $data['birthday'];
        if($birthdatString){
            $birthday= \DateTime::createFromFormat('Y-m-d', $birthdatString);
            if(!$birthday){
                return new JsonResponse(
                    [
                        'message'=> 'date de naissance non valide',
                    ]
                    );
            }
        }else {
            $birthday=null;
        }

        $user = new User();
        $user->setEmail($data['email'])
            ->setName($data['name'])
            ->setLastName($data['lastName'])
            ->setTelephone($data['phone'])
            ->setBirthday($birthday)
            ->setAdress($data['address'])
            ->setPassword($this->passwordHasher->hashPassword($user,$data['password']))
            ->setRoles(['ROLE_USER'])
            ->setIsActive(true)
            ->setCreatedAt(new \DateTimeImmutable('now'))
            ->setIsVerified(true);

        return $user;
    }
    private function saveUser( User $user): void{
        $this->entityManager->persist($user);
        $this->entityManager->flush();
    }
    private function handleValidationErrors($errors): JsonResponse
    {
        $errorMessages = [];
        foreach ($errors as $error) {
            $errorMessages[] = $error->getMessage();
        }
        return new JsonResponse(['errors' => $errorMessages], JsonResponse::HTTP_BAD_REQUEST);
    }

    #[Route('/api/user', name: 'get_all_users', methods: ['GET'])]
    public function getAllUsers(): JsonResponse
    {
        $users = $this->userRepository->findAll();
        $userList = [];

        foreach ($users as $user) {
            $userList[] = [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'name' => $user->getName(),
                'lastname' => $user->getLastName(),
                'phone' => $user->getTelephone(),
                'adress' => $user->getAdress(),
                'photo' => $user->getPhotoProfile(),
                'roles' => $user->getRoles(),
                'isActive' => $user->getIsActive(),
                'isVerified' => $user->getIsVerified(),
                'createdAt' => $user->getCreatedAt()->format('Y-m-d H:i:s'),
            ];
        }

        return new JsonResponse($userList);
    }

#[Route ('/api/user/email/{email}', name:'get_user_byEmail', methods:['GET'])]
    public function getUserByEmail ( $email) : JsonResponse {

        $user = $this->userRepository->findOneBy(['email' => $email]);
        if (!$user){
             // Si l'utilisateur n'existe pas, on renvoie que l'email est libre
            return new JsonResponse(
                    [
                        'error'=> 'user not found',
                        'exists'=> false
                    ],
                        JsonResponse::HTTP_ACCEPTED
                    );
        }else {
             // Si l'utilisateur existe, on renvoie une réponse JSON avec un message d'erreur
            return new JsonResponse([
                'user'=> $user,
                'exists'=> true
            ],
                JsonResponse::HTTP_ALREADY_REPORTED
            );
        }
    }

    // #[Route('/register/user', name: 'app_register_user')]
    // public function index(): Response
    // {
    //     return $this->render('register_user/index.html.twig', [
    //         'controller_name' => 'RegisterUserController',
    //     ]);
    // }
}
