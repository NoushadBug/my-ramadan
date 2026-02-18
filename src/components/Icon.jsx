import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const iconMap = {
  moon: 'fa-moon',
  sun: 'fa-sun',
  check: 'fa-check',
  calendar: 'fa-calendar',
  chartBar: 'fa-chart-bar',
  chartLine: 'fa-chart-line',
  cog: 'fa-cog',
  cloudSun: 'fa-cloud-sun',
  utensils: 'fa-utensils',
  bookQuran: 'fa-book-quran',
  mosque: 'fa-mosque',
  prayingHands: 'fa-praying-hands',
  handsPraying: 'fa-hands-praying',
  handHoldingHeart: 'fa-hand-holding-heart',
  sunset: 'fa-cloud-sun-rain',
  chevronLeft: 'fa-chevron-left',
  chevronRight: 'fa-chevron-right',
  plus: 'fa-plus',
  trash: 'fa-trash',
  edit: 'fa-edit',
  stickyNote: 'fa-sticky-note',
  target: 'fa-bullseye',
  fire: 'fa-fire',
  trophy: 'fa-trophy',
  listCheck: 'fa-list-check',
  user: 'fa-user'
};

export default function Icon({ name, className, ...props }) {
  return (
    <FontAwesomeIcon 
      icon={iconMap[name] || 'fa-check'} 
      className={className}
      {...props}
    />
  );
}
