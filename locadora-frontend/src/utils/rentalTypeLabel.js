export function rentalTypeLabel(type) {
    switch (type) {
      case 'daily':
        return 'Diária';
      case 'weekly':
        return 'Semanal';
      case 'biweekly':
        return 'Quinzenal';
      case 'monthly':
        return 'Mensal';
      default:
        return type;
    }
  }