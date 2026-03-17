import z from 'zod';

export const SignUpSchema = z
   .object({
      name: z
         .string()
         .min(1, { error: 'Это поле не может быть пустым' })
         .max(50, { error: 'Имя не может превышать 50 символов' }),
      email: z
         .email({ error: 'Пожалуйста, введите корректную почту' })
         .min(1, { error: 'Поле не может быть пустым' }),
      username: z
         .string()
         .min(3, {
            error: 'Имя пользователя не может быть короче 3 символов',
         })
         .max(30, {
            error: 'Имя пользователя не может быть длиннее 30 символов',
         })
         .optional(),
      password: z
         .string()
         .min(6, { error: 'Пароль должен содержать более 6 символов' })
         .max(100, { error: 'Пароль не может быть длиннее 100 символов' })
         .regex(/[A-Z]/, {
            error: 'Пароль должен содержать хотя бы одну заглавную букву',
         })
         .regex(/[a-z]/, {
            error: 'Пароль должен содержать хотя бы одну прописную букву',
         })
         .regex(/[0-9]/, {
            error: 'Пароль должен содержать хотя бы одну цифру',
         })
         .regex(/[^a-zA-Z0-9]/, {
            error: 'Пароль должен содержать хотя бы один специяльный знак',
         }),
      confirmPassword: z
         .string()
         .min(6, { error: 'Пароль должен содержать более 6 символов' }),
   })
   .refine((data) => data.password === data.confirmPassword, {
      error: 'Пароли не совпадают',
      path: ['confirmPassword'],
   });

export const SignInSchema = z.object({
   email: z.email({ error: 'Пожалуйста, введите корректную почту' }),
   password: z.string().min(1, { error: 'Введите пароль' }),
});

export const VerifySchema = z.object({
   code: z.string().length(4, 'Введите 4 цифры').regex(/^\d+$/, 'Только цифры'),
});

export const SendEmailSchema = z.object({
   email: z.email({ error: 'Введите корректную почту.' }),
});

export const ResetPasswordSchema = z.object({
   password: z
      .string()
      .min(6, { error: 'Пароль должен содержать более 6 символов' })
      .max(100, { error: 'Пароль не может быть длиннее 100 символов' })
      .regex(/[A-Z]/, {
         error: 'Пароль должен содержать хотя бы одну заглавную букву',
      })
      .regex(/[a-z]/, {
         error: 'Пароль должен содержать хотя бы одну прописную букву',
      })
      .regex(/[0-9]/, {
         error: 'Пароль должен содержать хотя бы одну цифру',
      })
      .regex(/[^a-zA-Z0-9]/, {
         error: 'Пароль должен содержать хотя бы один специяльный знак',
      }),
   confirmPassword: z
      .string()
      .min(6, { error: 'Пароль должен содержать более 6 символов' }),
});

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
   'image/jpeg',
   'image/jpg',
   'image/png',
   'image/webp',
];

export const UpdateProfileSchema = z.object({
   image: z
      .instanceof(File)
      .optional()
      .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
         message: 'Размер файла не должен превышать 10MB',
      })
      .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
         message: 'Разрешены только jpg, png и webp',
      }),
   name: z
      .string()
      .min(3, { error: 'Имя не может быть короче 3 символов' })
      .max(50, { error: 'Имя не может превышать 50 символов' })
      .transform((val) => (val === '' ? undefined : val))
      .optional(),
   username: z
      .string()
      .min(3, { error: 'Имя пользователя не может быть короче 3 символов' })
      .max(30, { error: 'Имя пользователя не может превышать 30 символов' })
      .transform((val) => (val === '' ? undefined : val))
      .optional(),
   bio: z
      .string()
      .max(500, {
         error: 'Статус не может превышать 500 символов',
      })
      .optional(),
});
