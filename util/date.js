export function getFormattedDate(date) {
  /**
   * just output a string mannually using string
   * interpolation with following template syntax ``
   * here which we have modern javascript
   */
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export function getDateMinusDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
