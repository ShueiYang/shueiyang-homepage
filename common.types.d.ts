
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

interface EmailForm {
    name: string,
    email: string,
    subject: string,
    message: string,
};

interface AdminForm {
    username: string,
    password: string,
}

interface ProjectForm {
    title: string,
    imageFile: string,
    description: string,
    siteUrl: string,
    githubUrl: string,
    content: string,
};

// type FormType = EmailForm | AdminForm | ProjectForm;