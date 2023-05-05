import React, { useContext } from "react";
import { LeaveContext } from "../contextApi/LeaveContext";
import "../css/companyleave.css";
import TopBar from "../components/TopBar";
import AdminDashboard from "../pages/AdminDashboard";
import AdminSidebar from "./AdminSidebar";

const AdminCompanyLeave = () => {
  const { employeeName } = useContext(LeaveContext);
  return (
    <div class="container">
      <AdminSidebar />
      <main class="main-content">
        <TopBar />
        <div class="bottom-container">
          <h1>Holidays</h1>
          <p className="text-left">
            5 days a week (Monday to Friday) work policy, 10 days of Public
            Holidays, 12 days of Annual Leaves and 7 days of Sick Leaves for you
            to be in the right mental state to contribute to project success all
            year round.
          </p>
          <h2>Public Holidays</h2>
          <p className="text-left">
            We only remain closed on selective public holidays as listed below:
          </p>
          <table>
            <thead className="available-days text-white rounded">
              <tr>
                <td className="px-2">Holiday</td>
                <td>Description</td>
                <td>Number of Days</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Dashain</td>
                <td className="text-left">
                  Asthami, Nawami, Bijaya Dashami, Ekadashi
                </td>
                <td>4</td>
              </tr>
              <tr>
                <td>Tihar</td>
                <td className="text-left">
                  Laxmi Puja, Govardhan Puja, Bhaitika
                </td>
                <td>3</td>
              </tr>
              <tr>
                <td>Shivaratri</td>
                <td>Shivaratri</td>
                <td>1</td>
              </tr>
              <tr>
                <td>Holi</td>
                <td className="text-left">Holi/Falgu Poornima (Kathmandu)</td>
                <td>1</td>
              </tr>
              <tr>
                <td>Nepali New Year</td>
                <td>Baisakh 1</td>
                <td>1</td>
              </tr>
              <tr>
                <td>Total</td>
                <td></td>
                <td>10</td>
              </tr>
            </tbody>
          </table>
          <h3>Additional Note on Public Holidays</h3>
          <ul>
            <li className="text-left">
              If you are in/from Terai, you can apply for the leave for Holi on
              different day than it is celebrated in Kathmandu.
            </li>
            <li className="text-left">
              If you celebrate Chhat, you are also allowed to apply for the paid
              leave on that day though not specifically mentioned above in the
              table
            </li>
          </ul>
          <h2>Leaves</h2>
          <table>
            <thead className="available-days text-white rounded">
              <tr>
                <td className="px-2">Type</td>
                <td>Available days</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Bereavement Leave</td>
                <td>13 days</td>
              </tr>
              <tr>
                <td>Maternity Leave</td>
                <td>60 days</td>
              </tr>
              <tr>
                <td>Bereavement Leave</td>
                <td>13 days</td>
              </tr>
              <tr>
                <td>Paternity Leave</td>
                <td>15 days</td>
              </tr>

              <tr>
                <td>Sick Leave</td>
                <td>7 days</td>
              </tr>
              <tr>
                <td>Annual Leave</td>
                <td>12 days</td>
              </tr>
              <tr>
                <td>Religious Leave</td>
                <td>5 days</td>
              </tr>
              <tr>
                <td>Unpaid Leave</td>
                <td>7 days</td>
              </tr>
              <tr>
                <td>Compensatory Leave</td>
                <td>30 days</td>
              </tr>
            </tbody>
          </table>
          <p className="text-left">
            Benefits such as the leave policy exist at company to support the
            needs of our employees during moments that matter the most by
            offering Paid Time Off (PTO), that enhance productivity through the
            lens of inclusion. And when they are ready both mentally and
            physically after their planned and personal time off, they can focus
            on rolling out new features without the exhaustion or fear of
            approaching deadline.
          </p>
          <h6>Note:</h6>
          <p className="text-left">
            Only compensation leaves are carried over to next working year if
            not taken within a particular yeat, all other leaves will reset on a
            yearly basis.
          </p>
          <h5>Bereavement Leave</h5>
          <p className="text-left">
            The loss of a family member is an emotionally distressing time, and
            people may not be in the right frame of mind to cope with their task
            at hand and other professional commitments. We have a policy to
            offer 13 days of bereavement leave as we do understand the necessity
            of showing compassion with an enlightened approach to create a
            positive work culture where our employees know they are respected
            and valued. When on a bereavement leave, please don't forget to
            update your Slack status with: "Away for Personal Reasons 💬"
          </p>
          <h5>Maternity Leave</h5>
          <p className="text-left">
            We realise that one of the most life changing events in an
            individual's life is the birth of a child. Our maternal leave policy
            has an extended fully paid maternal leave of total 2 months,
            available before, during or after your child's birth. When on a
            maternity leave, please don't forget to update your Slack status
            with: "Away for Personal Reasons 💬"
          </p>
          <h5>Paternity Leave</h5>
          <p className="text-left">
            We realise that one of the most life changing events in an
            individual's life is the birth of a child. Our paternal leave policy
            has an extended fully paid paternal leave of total 15 days,
            available before, during or after your child's birth. When on a
            paternity leave, please don't forget to update your Slack status
            with: "Away for Personal Reasons 💬"
          </p>
          <h5>Sick leave</h5>
          <p className="text-left">
            We strongly believe in having a policy that supports employees
            health where you get the time off you deserve to recover without
            having to think about the loss of pay. We facilitate our employees
            with 7 days of such paid sick leaves. Sick leaves taken after the
            available days will be considered non-paid leaves and a certain
            amount will be deducted from the salary. After your sick leave is
            approved you need to update your Slack status with the emoji 🤒 and
            appropriate text along with the date until you will be unavailable
            for, before you set yourself away. E.g. Sick 🤒
          </p>
          <h5>Annual Leave</h5>
          <p className="text-left">
            Annual leaves are called upon when the employee needs some time off
            work to recharge themselves, entitle themselves with a vacation or
            simply just to relax. Time constraints while working 9 to 6 make
            employees miss out the life that is happening outside their
            workspace. Rejuvenation is crucial for employees on all levels and
            allows them to bounce back with a boost in productivity. With all
            this in mind, we offer our employees with 12 days of time off work
            to finally step a break on those Slack messages, work-related emails
            and project deadlines. Once you are all set to go on that vacation
            you have been planning for days or even weeks, we would like you to
            keep up that excitement and update your slack status with the
            appropriate emoji and text. For e.g. if you are planning to go for
            trekking you could add a trekking boot emoji 🥾 and appropriate text
            along with the date until you will be unavailable for. Examples:
          </p>
          <ul className="text-left">
            <li className="text-left">On a Trek 🥾</li>
            <li className="text-left">On a Vacation 🏖️</li>
          </ul>
          <h5>Compensatory leave</h5>
          <p className="text-left">
            Employees who plan to work on weekends or a holiday due to the
            priority of the deliverables to ensure project success, our company
            offers them a compensatory off on any other workday to acknowledge
            their hard work. The compensatory leave is flexible as per the over
            time an employee has worked. However, if an employee still continues
            to work on weekends even after the project success is ensured then
            our company forces them to take a well deserved rest.
          </p>
          <h4>Who approves holiday?</h4>
          <p>
            We want to ensure teams own their holidays and that includes
            thinking about the commercial impact of taking them. To that affect
            we need to make sure you've done the following before booking a
            holiday.
          </p>
          <h6>Team Leads and PMs</h6>
          <ul className="text-left">
            <li className="text-left">
              Ask your PM and Team Lead if it's okay with them
            </li>
            <li>Ask your team members if it's okay with them.</li>
          </ul>
          <h6>Applies to all</h6>
          <ul className="text-left">
            <li className="text-left">
              Ensure your responsibilities are covered whilst you're away.
            </li>
            <li className="text-left">
              Ask the Senior Management through your Team Lead or PM only if you
              wish to book holiday outside of the guidelines.
            </li>
          </ul>
          <h5>Things to consider once the leave is approved</h5>
          <p className="text-left">
            Well now that your leave has been approved, you need to make sure of
            the following things before you are away from your keyboard:
          </p>
          <ul className="text-left">
            <li className="text-left">
              Notify about your leave in the related Slack project channel
            </li>
            <li className="text-left">
              Update your Slack status with appropriate emoji, text and the date
              you are on leave.
            </li>
          </ul>
          <p className="text-left">
            These things should be done so that your team mates are better
            informed about your unavailability and wouldn't mistakenly wait for
            you to reply to their messages which in turn helps manage
            expectations of everyone.
          </p>
        </div>
      </main>
    </div>
  );
};

export default AdminCompanyLeave;
