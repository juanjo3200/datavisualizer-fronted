export class Database {
    _id: string;
    nombre: string;
    descripcion: string;
    campos: Array<Field>;
}

export class Field {
    _id: string;
    nombre: string;
    tipo: string;
}