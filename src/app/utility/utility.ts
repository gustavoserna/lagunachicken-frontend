import { es } from 'date-fns/locale';
import { format } from 'date-fns';

export class utility {

    static formatFromStringToDate (date: Date) :string {
        //const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
        const formattedDate = format(date, 'MM/dd/yyyy', { locale: es });
        return formattedDate;
    }

}