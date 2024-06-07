export class Chofer {
    idChofer: number = 0;
    nombre: string = "";
    fechaNacimiento: Date | undefined;
    fechaNacimientoString: string | undefined;
    formattedDateNacimiento: string | undefined;
    direccion: string = "";
    nss: string = "";
    vencimientoLicencia: Date | undefined;
    vencimientoLicenciaString: string | undefined;
    formattedDateLicencia: string | undefined;
    tipoSangre: string = "";
    foto: string = "";
}