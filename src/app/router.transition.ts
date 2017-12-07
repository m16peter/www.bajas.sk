import { animate, group, query, style, transition, trigger, stagger } from '@angular/animations';

export const routerTransition = trigger('routerTransition',
[
  transition('* <=> *',
  [
    query(':enter, :leave',
      style(
      {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%'
      }),
      {
        optional: true
      }
    ),
    group(
    [
      query(':enter', stagger(500,
      [
        style(
        {
          transform: 'scale(1.2)',
          opacity: 0
        }),
        animate('0.3s ease-out',
          style(
          {
            transform: 'scale(1)',
            opacity: 1
          })
        )
      ]),
      {
        optional: true
      }),
      query(':leave',
      [
        style(
        {
          left: '0',
          transform: 'scale(1)',
          opacity: 1
        }),
        animate('0.3s ease-out',
          style(
          {
            left: '100%',
            transform: 'scale(0.5)',
            opacity: 0
          })
        )
      ],
      {
        optional: true
      })
    ])
  ])
])
