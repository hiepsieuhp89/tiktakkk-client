'use client';

import Captcha from '@/components/Captcha';
import { useUser } from '@/context/useUserContext';
import { setCookies } from '@/helper';
import { useSignIn } from '@/hooks/authentication';
import { ISignIn } from '@/interface/request/authentication';
import MessageClientContext from '@/provider/MessageProvider';
import { Button, Form, Input } from 'antd';
import { FormProps } from 'antd/lib';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';

type FieldType = {
  username: string;
  password: string;
};

type CaptchaType = 'image' | 'audio' | 'text';

const generateTextCaptcha = () => {
  const operators = ['+', '-', '*'];
  const num1 = Math.floor(Math.random() * 10);
  const num2 = Math.floor(Math.random() * 10);
  const operator = operators[Math.floor(Math.random() * operators.length)];
  const question = `${num1} ${operator} ${num2}`;
  const answer = eval(question).toString();
  return { question, answer };
};

const generateAudioCaptcha = () => {
  const numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const randomNumbers = Array.from({length: 3}, () => Math.floor(Math.random() * 10));
  const audioText = randomNumbers.map(num => numbers[num]).join(' ');
  return { audioText, answer: randomNumbers.join('') };
};

const SignInForm = () => {
  const router = useRouter();
  const { mutateAsync, isPending } = useSignIn();
  const { handleErrorMessage } = useContext(MessageClientContext);
  const { loginUser } = useUser();
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const [captchaTarget, setCaptchaTarget] = useState('');
  const [captchaImages, setCaptchaImages] = useState<Array<{ id: number, src: string, type: string }>>([]);
  const [formValues, setFormValues] = useState<FieldType | null>(null);
  const [captchaType, setCaptchaType] = useState<CaptchaType>('image');
  const [textCaptcha, setTextCaptcha] = useState({ question: '', answer: '' });
  const [audioCaptcha, setAudioCaptcha] = useState({ audioText: '', answer: '' });

  // Generate random captcha challenge
  const generateCaptcha = () => {
    setCaptchaLoading(true);

    const types = ['cat', 'dog', 'koala', 'bird', 'fish', 'rabbit'];
    const randomType = types[Math.floor(Math.random() * types.length)];

    // Create unique image URLs using timestamp to prevent caching
    const timestamp = Date.now();

    // Generate 1 correct image
    const correctImage = {
      id: 1,
      src: `https://source.unsplash.com/100x100/?${randomType}&${timestamp}`,
      type: randomType
    };

    // Generate 5 unique wrong images
    const wrongTypes = types.filter(t => t !== randomType);
    const wrongImages: { id: number; src: string; type: string }[] = [];

    while (wrongImages.length < 5) {
      const randomWrongType = wrongTypes[Math.floor(Math.random() * wrongTypes.length)];
      if (!wrongImages.some(img => img.type === randomWrongType)) {
        wrongImages.push({
          id: wrongImages.length + 2,
          src: `https://source.unsplash.com/100x100/?${randomWrongType}&${timestamp}`,
          type: randomWrongType
        });
      }
    }

    // Combine and shuffle images
    const allImages = [correctImage, ...wrongImages];
    const shuffled = allImages.sort(() => 0.5 - Math.random());

    setCaptchaTarget(randomType);
    setCaptchaImages(shuffled);

    setTimeout(() => {
      setCaptchaLoading(false);
    }, 500);
  };

  const generateRandomCaptcha = () => {
    const types: CaptchaType[] = ['image', 'audio', 'text'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    setCaptchaType(randomType);

    if (randomType === 'image') {
      generateCaptcha();
    } else if (randomType === 'text') {
      setTextCaptcha(generateTextCaptcha());
    } else if (randomType === 'audio') {
      setAudioCaptcha(generateAudioCaptcha());
    }
  };

  const handleCaptchaSuccess = async () => {
    setShowCaptcha(false);
    
    // Login after captcha verification
    if (formValues) {
      try {
        const payload: ISignIn = {
          username: formValues.username,
          password: formValues.password,
        };
        const response = await mutateAsync(payload);
        
        if (response?.data?.accessToken) {
          // Login user immediately
          setCookies(response.data.accessToken);
          loginUser(response.data.user, response.data.accessToken);
          router.push('/');
        }
      } catch (error: any) {
        handleLoginError(error);
      }
    }
  };

  const handleLoginError = (error: any) => {
    const statusCode = error?.response?.status;
    const errorMessage = error?.response?.data?.message;
    
    if (statusCode === 404) {
      handleErrorMessage("Không tìm thấy tài khoản");
    } else if (statusCode === 401) {
      handleErrorMessage("Thông tin đăng nhập không chính xác");
    } else {
      handleErrorMessage(errorMessage || 'Login failed');
    }
  };

  const onFinish: FormProps<FieldType>['onFinish'] = (values: FieldType) => {
    setFormValues(values);
    setShowCaptcha(true);
  };

  return (
    <>
      {!showCaptcha ? (
        <>
          <h1 className='text-[28px] font-medium'>Sign In</h1>
          <Form
            name="normal_login"
            onFinish={onFinish}
            layout='vertical'
          >
            <Form.Item
              label={<strong>Email</strong>}
              name="username"
              rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
            >
              <Input placeholder="Tên đăng nhập" />
            </Form.Item>
            <Form.Item
              label={<strong>Mật khẩu</strong>}
              name="password"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            >
              <Input.Password
                type="password"
                placeholder="Mật khẩu"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button w-full !font-medium !h-[32px] !rounded-sm !px-2 !py-1"
                loading={isPending}
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </>
      ) : (
        <Captcha 
          onSuccess={handleCaptchaSuccess}
          onError={handleErrorMessage}
          onBack={() => setShowCaptcha(false)}
        />
      )}
    </>
  );
};

export default SignInForm;