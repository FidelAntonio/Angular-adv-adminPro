// una inerface sirven para tener siertas restricciones y forzar que un objeto tenga cierta forma y solo funciona en typescrip

export interface RegisterForm {
    nombre: string;
    email: string;
    password: string;
    password2: string;
    terminos: boolean;
}

