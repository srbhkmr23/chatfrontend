import { Injectable, Pipe, PipeTransform } from '@angular/core';  
  
@Pipe({  
    name: 'searchpipe'  
})  
  
@Injectable()  
export class SearchPipe implements PipeTransform {  
    transform(items: any[], value: string): any[] {  
        if (!items) return [];  
        if(value) {  
            // alert(value)
            return items.filter(item => item.name.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) > -1);  
        }  
        else  
        {
            return items;  
        }  
    }  
}