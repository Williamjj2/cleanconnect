import { configureAxe } from '@axe-core/react'

export const axeConfig = configureAxe({
  rules: [
    {
      id: 'color-contrast',
      enabled: true,
    },
    {
      id: 'aria-required-attr',
      enabled: true,
    },
    {
      id: 'aria-valid-attr',
      enabled: true,
    },
    {
      id: 'button-name',
      enabled: true,
    },
    {
      id: 'form-field-multiple-labels',
      enabled: true,
    },
    {
      id: 'image-alt',
      enabled: true,
    },
    {
      id: 'label',
      enabled: true,
    },
    {
      id: 'link-name',
      enabled: true,
    },
    {
      id: 'list',
      enabled: true,
    },
    {
      id: 'listitem',
      enabled: true,
    },
    {
      id: 'meta-viewport',
      enabled: true,
    },
    {
      id: 'page-has-heading-one',
      enabled: true,
    },
    {
      id: 'region',
      enabled: true,
    },
    {
      id: 'skip-link',
      enabled: true,
    },
    {
      id: 'valid-lang',
      enabled: true,
    },
  ],
}) 