import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessagesService } from './messages.service';

// @Injectable() 装饰器告诉 Angular 这个服务本身可能拥有被注入的依赖。
// 目前它还没有依赖，但是很快就会有了。 无论它会不会有，总是给服务加上这个装饰器都是一种好的做法。
@Injectable()
export class HeroService {

  constructor(private messagesService: MessagesService) { }

  getHero(): Hero[] {
    return HEROES;
  }

  getHeroes(): Observable<Hero[]> {
    this.messagesService.add('HeroService: fetched heroes');
    return of(HEROES); // of(HEROES) 会返回一个 Observable<Hero[]>，它会发出单个值，这个值就是这些模拟英雄的数组。
  }

}
