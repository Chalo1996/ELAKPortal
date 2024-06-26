import sspFlag from '../../assets/flags/ssp.png';
import cdfFlag from '../../assets/flags/cdf.png';
import rwfFlag from '../../assets/flags/rwf.png';
import kesFlag from '../../assets/flags/kes.png';
import tzsFlag from '../../assets/flags/tzs.png';
import ugxFlag from '../../assets/flags/ugx.png';


    const preventNumericInput = (event) => {
        if (/[0-9]/.test(event.key)) {
          event.preventDefault();
        }
      };
      
      const preventTextInput = (event) => {
        if (!/[0-9]/.test(event.key)) {
          event.preventDefault();
        }
      };
      
      const disabledDate = (current) => {
        if (!current) return false;
        const selectedDate = new Date(current);
        const today = new Date();
        let age = today.getFullYear() - selectedDate.getFullYear();
        const hasBirthdayOccurred =
          today.getMonth() > selectedDate.getMonth() ||
          (today.getMonth() === selectedDate.getMonth() &&
            today.getDate() >= selectedDate.getDate());
        if (!hasBirthdayOccurred) {
          age--;
        }
        return age < 18 || age > 75;
      };
      
      const disabledTodayDate = (current) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return current && current.toDate() < today;
      };

      const PhoneAreas = [
        { code: "+211", flag: sspFlag, country: "South Sudan" },
        { code: "+243", flag: cdfFlag, country: "DRC" },
        { code: "+250", flag: rwfFlag, country: "Rwanda" },
        { code: "+254", flag: kesFlag, country: "Kenya" },
        { code: "+255", flag: tzsFlag, country: "Tanzania" },
        { code: "+256", flag: ugxFlag, country: "Uganda" },
      ];


export {preventNumericInput, preventTextInput, disabledDate, disabledTodayDate, PhoneAreas};