import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  // hero 属性必须是一个带有 @Input() 装饰器的输入属性，
  // 因为外部的 HeroesComponent 组件将会绑定到它
  @Input() hero: Hero;

  constructor(
    // HeroService 从远端服务器获取英雄数据，本组件将使用它来获取要显示的英雄。
    private heroService: HeroService,
    // ActivatedRoute 保存着到这个 HeroDetailComponent 实例的路由信息,
    // 这个组件对从 URL 中提取的路由参数感兴趣。 其中的 id 参数就是要现实的英雄的 id
    private route: ActivatedRoute,
    // location 是一个 Angular 的服务，用来与浏览器打交道。 稍后，你就会使用它来导航回上一个视图。
    private location: Location
  ) { }

  ngOnInit() {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id'); //  JavaScript 的 (+) 操作符会把字符串转换成数字，英雄的 id 就是数字类型。
    this.heroService.getHero(id)
    .subscribe(hero => {
      this.hero = hero;
    });
  }

  goBack(): void {
    this.location.back();
  }
}
