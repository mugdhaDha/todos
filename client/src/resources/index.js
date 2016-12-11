export function configure(config) {
  config.globalResources([
  './value-converters/gravatar-url',
  './value-converters/date-format',
  './value-converters/done',
  './value-converters/hide-completed'
  ]);
}

