import { Component, OnInit } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';

@Component({
  selector: 'app-popcorn-background',
  templateUrl: './popcorn-background.component.html',
  styleUrls: ['./popcorn-background.component.scss']
})
export class PopcornBackgroundComponent implements OnInit {

  ngOnInit(): void {
    this.startPopcornAnimation();
  }

  startPopcornAnimation() {
    const numberOfPopcorns = 50;
    const popcornContainer = document.getElementById('popcorn-container');
    for (let i = 0; i < numberOfPopcorns; i++) {
      const popcorn = document.createElement('div');
      popcorn.classList.add('popcorn');
      popcornContainer?.appendChild(popcorn);

      anime({
        targets: popcorn,
        translateY: [
          { value: -500, duration: 2000 + Math.random() * 1000, delay: Math.random() * 5000 },
          { value: 0, duration: 0, delay: Math.random() * 5000 }
        ],
        translateX: { value: () => anime.random(-100, 100), duration: 2000 + Math.random() * 1000 },
        scale: [
          { value: 1.5, duration: 500, delay: Math.random() * 1000 },
          { value: 1, duration: 1500, delay: Math.random() * 5000 }
        ],
        opacity: [
          { value: 1, duration: 500 },
          { value: 0, duration: 1500, delay: Math.random() * 5000 }
        ],
        loop: true,
        easing: 'easeOutElastic(1, .5)'
      });
    }

    // Humo
    const smokeContainer = document.getElementById('smoke-container');
    for (let i = 0; i < 10; i++) {
      const smoke = document.createElement('div');
      smoke.classList.add('smoke');
      smokeContainer?.appendChild(smoke);

      anime({
        targets: smoke,
        translateY: [
          { value: -600, duration: 10000 + Math.random() * 10000, delay: Math.random() * 5000 }
        ],
        translateX: { value: () => anime.random(-100, 100), duration: 10000 + Math.random() * 10000 },
        opacity: [
          { value: 0.3, duration: 2000 },
          { value: 0, duration: 8000, delay: Math.random() * 10000 }
        ],
        loop: true,
        easing: 'linear'
      });
    }
  }
}
