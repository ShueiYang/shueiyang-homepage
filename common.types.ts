
export interface Portfolio {
    id: string;
    title: string;
    description: string;
    imageFile: ImageProps;
    siteUrl?: string;
    stack: string[];
    githubUrl?: string,
    content?: string;
};

export interface EmailForm {
    name: string,
    email: string,
    subject: string,
    message: string,
};

export interface AdminForm {
    username: string,
    password: string,
}

export interface ProjectForm {
    title: string,
    imageFile: string,
    description: string,
    siteUrl: string,
    githubUrl: string,
    stack: string,
    content: string,
};

export interface ImageProps {
    public_id: string;
    folder: string,
    secure_url: string;
}

export type DataKeys = ProjectForm & {
    id: string,
}

export interface ProjectData {
    id: string;
    title: string;
    description: string;
    images: ImageProps[]
    siteUrl: string;
    stack: string[];
    githubUrl: string,
    content: string;
};

export interface validateForm {
    titleName: string
}