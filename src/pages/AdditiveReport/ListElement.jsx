import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate  } from 'react-router-dom';

function ListElement({ op }) {

  const { t } = useTranslation();


  const dateString = new Date(op.date).toISOString().split('T')[0];

  return (
    <tr>
      <td className="text-center">{dateString}</td>
      <td className="text-start">{op.additiveLabel}</td>
      <td className="text-center">{op.additiveAccounting}</td>
      <td className="text-end">{Math.round(op.quantity * 1000) / 1000}</td>
      <td className="text-center">{t(op.additiveUnit)}</td>
      <td className="text-start">{op.refWineLot}</td>
      <td className="text-center">{op.refWineAccounting}</td>
    </tr>
  );
}

export default ListElement;