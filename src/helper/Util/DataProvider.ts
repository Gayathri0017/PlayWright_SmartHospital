import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';

export interface AppointmentDetails {
    date :  string,
    specialist : string,
    doctor : string,
    shift : string,
    slot : string,
    message : string,
    availslot : string
}

export class DataProvider {
    static getAppointmentDetailsFromCSV(): AppointmentDetails[] {
        const filePath = path.resolve(__dirname, './test-data/Appointment.csv');
        const fileContent = fs.readFileSync(filePath, 'utf-8');

        const records: AppointmentDetails[] = parse(fileContent, {
            columns: true,
            skip_empty_lines: true,
            trim: true
        });

        return records;
    }
}
