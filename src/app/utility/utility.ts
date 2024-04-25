import { addDays } from 'date-fns';
import { format, toZonedTime } from 'date-fns-tz';
import { es } from 'date-fns/locale';

export class utility {

    static formatFromStringToDate (date: Date) :string {
        const mexicoTimeZone = 'America/Mexico_City';

        // se suma un dia por el error que hay en la fecha, selecciona un dia menos
        const nextDay = addDays(date, 1);

        // Convertir la fecha a la zona horaria de México
        const zonedDate = toZonedTime(nextDay, mexicoTimeZone);

        const formattedDate = format(zonedDate, 'dd/MM/yyyy', { locale: es });
        return formattedDate;
    }

    static formatFromStringToDateDescriptive (date: Date) :string {
        const mexicoTimeZone = 'America/Mexico_City';

        // se suma un dia por el error que hay en la fecha, selecciona un dia menos
        const nextDay = addDays(date, 1);

        // Convertir la fecha a la zona horaria de México
        const zonedDate = toZonedTime(nextDay, mexicoTimeZone);

        const formattedDate = format(zonedDate, "dd 'de' MMMM 'del' yyyy", { locale: es });
        return formattedDate;
    }

    static convertToUTC(date: Date): Date {
        const dateString = date.toString();
        const partes: string[] = dateString.split('-');

        const dateUTC = new Date(Date.UTC(
            parseInt(partes[0]), // year
            parseInt(partes[1]) - 1, // month (0-indexed)
            parseInt(partes[2]) + 1 // day (se suma un dia por el error que hay en la fecha, selecciona un dia menos)
        ));
        
        console.log(dateUTC);
        return dateUTC;
    }

    static convertToDayMonthYearFormat(dateString: string): string {
        // Split the date string into day, month, and year parts
        const parts = dateString.split('/');
        
        // Rearrange the parts to mm/dd/yyyy format
        const rearrangedDate = `${parts[1]}/${parts[0]}/${parts[2]}`;
        
        return rearrangedDate;
    }

}