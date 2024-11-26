//Clase que extraera todos los datos del perfil de un anuncio.
export class Anuncios_get{
    constructor(
        public id_anuncio: number = 0,
        public numero_usuario: string = '', 
        public id_alojamiento: string = '',
        public titulo: string = '',
        public descripcion: string = '',
        public precio: number = 0,
        public num_habitaciones: number = 0,
        public num_camas: number = 0,
        public num_banos: number = 0,
        public fecha_inicio: Date,
        public fecha_fin?: Date,
        public direccion_imagen: string = '', 
        
    ){
        // Asignar undefined si fecha_fin no se proporciona.
        this.fecha_fin = fecha_fin
    }
    
}

//Clase que permitira extraer los perfiles de anuncios.
export class AnuncioIncompletos_get{
    constructor(
    public id_anuncio: number,
    public titulo: string = '', 
    public descripcion: string = '', 
    public num_habitaciones: number ,
    public num_camas: number ,
    public num_banos: number ,
    public id_alojamiento: number ,
    public precio: number, 
    public fecha_inicio: string = '', 
    public fecha_fin: string = '', 
    public direccion: string = '',
    public latitud: string = '',
    public longitud: string = '',
    ){

    }
}

export class Anuncios_add{
    constructor(
        public id_usuario: string = '', 
        public id_alojamiento: string = '',
        public titulo: string = '',
        public descripcion: string = '',
        public precio: number = 0,
        public num_habitaciones: number = 0,
        public num_camas: number = 0,
        public num_banos: number = 0,
        public fecha_inicio: Date  = new Date(),
        public fecha_fin?: Date
    ){
      
    }
    
}

//Clase que permitira extraer los perfiles de anuncios.
export class cardAnuncio_get{
    constructor(
    public id_anuncio: number,
    public titulo: string = '', 
    public descripcion: string = '', 
    public precio: string = '', 
    public fecha_inicio: string = '', 
    public fecha_fin: string = '', 
    public direccion: string = '',
    public direccion_imagen: string = '',
    public id_alojamiento: number ,
    ){

    }
}

//Clase para recibir Json con los urls de la informacion en determinado anuncio.
export class AnuncioInfo_get{
    constructor(
    public titulo: string = '', 
    public descripcion: string = '',
    public num_habitaciones: number, 
    public num_camas: number,
    public num_banos: number,
    public id_alojamiento: number,
    public id_usuario: string = '',
    public precio: string = '', 
    public fecha_inicio: string = '', 
    public fecha_fin: string = '', 
    public direccion: string = '',
    public latitud: string = '',
    public longitud: string = '',
    ){

    }
}

//Clase para recibir Json con los urls de las imagenes en determinado anuncio.
export class AnuncioImagenes_get{
    constructor(
    public id_imagen: number,
    public num_imagen: number,
    public direccion_imagen: string = '',
    ){

    }
}

export class tipoAlojamiento_get{
    constructor(
        public id_alojamiento: number , 
        public descripcion: string = '',
    ){

    }
}

export class tipoServicio_get{
    constructor(
        public id_alojamiento: number , 
        public descripcion: string = '',
        public categoria: string = '',
    ){

    }
}

export class DireccionAnuncio_put
{
    constructor( 
        public id_anuncio: number,
        public id_usuario: string = '', 
        public direccion: string = '',
    ){

    }
}

export class UltimoAnuncio_get{
    constructor(
        public id_anuncio: number,
    ){
        
    }
}

//Clase que extraera id_alojamiento de un anuncio.
export class Tipoaljamiento_put{
    constructor(
        public id_alojamiento: string = '',
    ){
        
    }
}
//Clase que extraera el num_habitaciones, num_camas y num_baños de un anuncio incompleto.
export class Cantidades_put{
    constructor(
        public num_habitaciones: number,
        public num_camas: number,
        public num_banos: number,
    ){
        
    }
}

//Clase que extraera el num_habitaciones, num_camas y num_baños de un anuncio incompleto.
export class Descripcion_put{
    constructor(
        public titulo: string = '',
        public descripcion: string = '',
        public precio: number,
    ){
        
    }
}

export class Fecha_put{
    constructor(
        public fecha_inicio: string = '',
        public fecha_fin: string = ''
    ){
        
    }
}

export class Imagen_add{
    constructor(
        public archivo: File,
    ){
        
    }
}


