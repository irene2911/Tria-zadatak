import { formatDate } from './utils';

export const today = formatDate(new Date());
export const apiCutoff = formatDate(new Date(2023, 0, 1));
