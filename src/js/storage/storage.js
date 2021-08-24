export const CURRENT_DAY = "current_day";
export const CALENDAR_MONTH = "calendar_month";
export const CALENDAR_YEAR = "calendar_year";
export const EXERCISES = "exercises";

export class Storage {
  constructor() {}

  get(key, defaultValue) {
    const value = window.localStorage.getItem(key);

    if (value === null) {
      this.save(key, defaultValue);

      return defaultValue;
    }

    return this.normalize(value);
  }

  save(key, value) {
    window.localStorage.setItem(key, this.transform(value));
  }

  transform(value) {
    const type = value.constructor.name;
    switch (type) {
      default:
        break;
      case "Date":
        value = value.toString();
        break;
    }

    return JSON.stringify({ type: type, value: value });
  }

  normalize(value) {
    value = JSON.parse(value);
    switch (value.type) {
      default:
        return value.value;
      case "Date":
        return new Date(value.value);
    }
  }
}
