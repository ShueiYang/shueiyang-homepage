
interface Portfolio {
    id: string;
    title: string;
    description: string;
    imageFile: ImageProps;
    siteUrl?: string;
    stack: string[];
    githubUrl?: string,
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
    stack: string,
    content: string,
};

interface ImageProps {
    public_id: string;
    folder: string,
    secure_url: string;
}

type DataKeys = ProjectForm & {
    id: string,
}

interface ProjectData {
    id: string;
    title: string;
    description: string;
    images: ImageProps[]
    siteUrl: string;
    stack: string[];
    githubUrl: string,
    content: string;
};

interface validateForm {
    titleName: string
}