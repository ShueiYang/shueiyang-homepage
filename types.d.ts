
interface Portfolio {
    id: string;
    title: string;
    description: string;
    image: string[];
    url?: string;
    stack: string[];
    source: string,
    content?: string;
};

interface InputsProps {
    name: string,
    email: string,
    subject: string,
    message: string,
    title: string,
    description: string,
    content: string,
    username: string,
    password: string,
};
