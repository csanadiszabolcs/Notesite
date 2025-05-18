export interface Note {
    id: number,
    title:string;
    content:string;
    priority:'Sürgős'| 'Nem sürgős';
    dueDate: string;

  }