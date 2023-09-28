import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';



@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return value ? parseFloat(value).toLocaleString(undefined, { minimumFractionDigits: 2 }) : '00';
    // return parseFloat(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}



@Pipe({
  name: 'titleCasing'
})
export class TitleCasingPipe implements PipeTransform {

  transform(value: string,): any {
    if(!value)return null;

    const words = value.split(' ');
    for(let i = 0;i<words.length; i++){
      if( this.isPreposition(words[i])&& i !== 0){
        words[i] = words[i].toLowerCase();
      }
      else{
        words[i] = this.toTilteCase(words[i]);
      }
    }
    return words.join(' ');
  }
   private isPreposition(word: string) : boolean{
      const prepositions = [
        'of','the'
      ];
      return prepositions.includes(word.toLowerCase());
  }
  private toTilteCase(word: string): string{
    return word.substr(0,1).toUpperCase() + word.substr(1).toLowerCase();
  }
}