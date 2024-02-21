import './About.css';
import { useTranslation } from 'react-i18next';

import PageTitle from '../_shared/PageTitle';


function About () {

  const { t } = useTranslation();

  // get the current year as a string
  const currentYear = new Date().getFullYear().toString();

  return (
    <div>
      <PageTitle>{t('about-title')}</PageTitle>
      <div className="my-6">
        {Array.from({ length: 6 }, (_, index) => (
          <p key={index}>{t(`about-${index + 1}`)}</p>
        ))}

      </div>


      <p className='mt-5'>© {currentYear} {t('GeorgiGatin')}</p>
    </div>
  );
};

export default About;