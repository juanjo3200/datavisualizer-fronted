
export class Database {
    nombre: string;
    descripcion: string;
    campos: Array<Field>;
}

export class Field {
    nombre: string;
    tipo: string;
}

export class Visualization {
    nombre: string;
    database: Array<String>;
    pivots: Array<String>;
    algoritmo: string;
    claseCluster: string;
    algoritmosTest: Array<string>;
}

export class VisualizationPreprocess{
    
}


export const Database_mock: Database[] = [{
    nombre: "ISOC",
    descripcion: "Share of person tal Duis ipsum culpa cupidatat voluptate sunt exercitation est magna. Quis nostrud nisi laboris nostrud proident veniam magna consequat esse. Nulla sunt consequat minim incididunt. Minim laborum velit voluptate duis ea mollit adipisicing laboris eiusmod nisi ad consectetur ea officia. Incididunt nostrud cillum reprehenderit aliqua in ut occaecat fugiat magna tempor elit voluptate deserunt nisi. Cupidatat incididunt fugiat dolore nisi laboris ipsum amet. Lorem tempor nulla proident amet nisi fugiat quis proident magna reprehenderit id eiusmod est molli",
    campos: [{ nombre: "unit", tipo: "Clase" }, { nombre: "Year", tipo: "Numerico" }],
},
{
    nombre: "ISOC1",
    descripcion: "Share of person tal Duis ipsum culpa cupidatat voluptate sunt exercitation est magna. Quis nostrud nisi laboris nostrud proident veniam magna consequat esse. Nulla sunt consequat minim incididunt. Minim laborum velit voluptate duis ea mollit adipisicing laboris eiusmod nisi ad consectetur ea officia. Incididunt nostrud cillum reprehenderit aliqua in ut occaecat fugiat magna tempor elit voluptate deserunt nisi. Cupidatat incididunt fugiat dolore nisi laboris ipsum amet. Lorem tempor nulla proident amet nisi fugiat quis proident magna reprehenderit id eiusmod est molli",
    campos: [{ nombre: "unit", tipo: "Clase" }, { nombre: "Year", tipo: "Numerico" }],
}
    ,
{
    nombre: "ISOC2",
    descripcion: "Share of person tal Duis ipsum culpa cupidatat voluptate sunt exercitation est magna. Quis nostrud nisi laboris nostrud proident veniam magna consequat esse. Nulla sunt consequat minim incididunt. Minim laborum velit voluptate duis ea mollit adipisicing laboris eiusmod nisi ad consectetur ea officia. Incididunt nostrud cillum reprehenderit aliqua in ut occaecat fugiat magna tempor elit voluptate deserunt nisi. Cupidatat incididunt fugiat dolore nisi laboris ipsum amet. Lorem tempor nulla proident amet nisi fugiat quis proident magna reprehenderit id eiusmod est molli",
    campos: [{ nombre: "unit", tipo: "Clase" }, { nombre: "Year", tipo: "Numerico" }],
}
    , {
    nombre: "ISOC3",
    descripcion: "Share of person tal Duis ipsum culpa cupidatat voluptate sunt exercitation est magna. Quis nostrud nisi laboris nostrud proident veniam magna consequat esse. Nulla sunt consequat minim incididunt. Minim laborum velit voluptate duis ea mollit adipisicing laboris eiusmod nisi ad consectetur ea officia. Incididunt nostrud cillum reprehenderit aliqua in ut occaecat fugiat magna tempor elit voluptate deserunt nisi. Cupidatat incididunt fugiat dolore nisi laboris ipsum amet. Lorem tempor nulla proident amet nisi fugiat quis proident magna reprehenderit id eiusmod est molli",
    campos: [{ nombre: "unit", tipo: "Clase" }, { nombre: "Year", tipo: "Numerico" }],
}];