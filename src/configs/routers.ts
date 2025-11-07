import LOGIN from '../pages/login.jsx';
import REGISTER from '../pages/register.jsx';
import PROFILE from '../pages/profile.jsx';
import EDITPROFILE from '../pages/editProfile.jsx';
import CHANGEPASSWORD from '../pages/changePassword.jsx';
import SECURITY from '../pages/security.jsx';
import DETECTIONCENTER from '../pages/detectionCenter.jsx';
import HEALTHREPORT from '../pages/healthReport.jsx';
import MYPLAN from '../pages/myPlan.jsx';
import MALL from '../pages/mall.jsx';
import CUSTOMFORMULA from '../pages/customFormula.jsx';
import PERSONALCENTER from '../pages/personalCenter.jsx';
import HOME from '../pages/home.jsx';
export const routers = [{
  id: "login",
  component: LOGIN
}, {
  id: "register",
  component: REGISTER
}, {
  id: "profile",
  component: PROFILE
}, {
  id: "editProfile",
  component: EDITPROFILE
}, {
  id: "changePassword",
  component: CHANGEPASSWORD
}, {
  id: "security",
  component: SECURITY
}, {
  id: "detectionCenter",
  component: DETECTIONCENTER
}, {
  id: "healthReport",
  component: HEALTHREPORT
}, {
  id: "myPlan",
  component: MYPLAN
}, {
  id: "mall",
  component: MALL
}, {
  id: "customFormula",
  component: CUSTOMFORMULA
}, {
  id: "personalCenter",
  component: PERSONALCENTER
}, {
  id: "home",
  component: HOME
}]