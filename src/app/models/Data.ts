export class Data {
    labels: string[] = [];
    datasets: Dataset[] = [];
}

export class Dataset {
    label: string = "";
    backgroundColor: string = "";
    data: number[] = [];
}