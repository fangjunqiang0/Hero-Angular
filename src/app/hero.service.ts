import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of} from 'rxjs';
import { MessagesService } from './messages.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';



// @Injectable() 装饰器告诉 Angular 这个服务本身可能拥有被注入的依赖。
// 目前它还没有依赖，但是很快就会有了。 无论它会不会有，总是给服务加上这个装饰器都是一种好的做法。
@Injectable()
export class HeroService {

  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(
    private messagesService: MessagesService,
    private http: HttpClient
  ) { }
  // this.log('HeroService: fetched heroes');
    // 所有的 HttpClient 方法都会返回某个值的 RxJS Observable。
    // HTTP 是一个请求/响应式协议。你发起请求，它返回单个的响应。
    // 通常，Observable 可以在一段时间内返回多个值。 但来自 HttpClient 的 Observable 总是发出一个值，然后结束，再也不会发出其它值。
    // 具体到这次 HttpClient.get 调用，它返回一个 Observable<Hero[]>，顾名思义就是“一个英雄数组的可观察对象”。在实践中，它也只会返回一个英雄数组。

    // HttpClient.get 默认情况下把响应体当做无类型的 JSON 对象进行返回。 如果指定了可选的模板类型 <Hero[]>，就会给返回你一个类型化的对象。
    // JSON 数据的具体形态是由服务器的数据 API 决定的

    // 其它 API 可能在返回对象中深埋着你想要的数据。 你可能要借助 RxJS 的 map 操作符对 Observable 的结果进行处理，以便把这些数据挖掘出来。
    // 虽然不打算在此展开讨论，不过你可以到范例源码中的 getHeroNo404() 方法中找到一个使用 map 操作符的例子。

    // 要捕获错误，你就要使用 RxJS 的 catchError() 操作符来建立对 Observable 结果的处理管道（pipe）
    // 从 rxjs/operators 中导入 catchError 符号，以及你稍后将会用到的其它操作符。

    // HeroService 的方法将会窥探 Observable 的数据流，并通过 log() 函数往页面底部发送一条消息
    // 它们可以使用 RxJS 的 tap 操作符来实现，该操作符会查看 Observable 中的值，使用那些值做一些事情，并且把它们传出来。 这种 tap 回调不会改变这些值本身。

    // catchError() 操作符会拦截失败的 Observable。 它把错误对象传给错误处理器，错误处理器会处理这个错误。
    // 下面的 handleError() 方法会报告这个错误，并返回一个无害的结果（安全值），以便应用能正常工作。
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(heroes => this.log(`fetched heroes`)),
      catchError(this.handleError('getHeroes', []))
    );
  }



  getHero(id: number): Observable<Hero> {
    const getHeroUrl = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(getHeroUrl)
      .pipe(
        tap( _ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  /** Log a HeroService message with the MessageService */
private log(message: string) {
  this.messagesService.add('HeroService: ' + message);
}

  private handleError<T> (operation: string = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
