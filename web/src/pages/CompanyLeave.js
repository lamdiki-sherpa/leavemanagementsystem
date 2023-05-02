import React, { useContext } from "react";
import Sidebar from "../components/Sidebar";
import { LeaveContext } from "../contextApi/LeaveContext";
import "../css/companyleave.css";
import EmployeeDashboard from "../components/EmployeeDashboard";

const CompanyLeave = () => {
  const { employeeName } = useContext(LeaveContext);
  return (
    <div class="container">
      <Sidebar />
      <main class="main-content">
        <div class="top-container">
          <div action="#" class="search">
            <svg
              class="search__icon"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.5418 19.25C15.3513 19.25 19.2502 15.3512 19.2502 10.5417C19.2502 5.73223 15.3513 1.83337 10.5418 1.83337C5.73235 1.83337 1.8335 5.73223 1.8335 10.5417C1.8335 15.3512 5.73235 19.25 10.5418 19.25Z"
                stroke="#596780"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20.1668 20.1667L18.3335 18.3334"
                stroke="#596780"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <input
              type="text"
              class="search__input"
              placeholder="Search something here"
            />
          </div>
          <div class="user-nav">
            <button class="notification">
              <svg
                class="notification__icon"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.0201 2.91003C8.71009 2.91003 6.02009 5.60003 6.02009 8.91003V11.8C6.02009 12.41 5.76009 13.34 5.45009 13.86L4.30009 15.77C3.59009 16.95 4.08009 18.26 5.38009 18.7C9.69009 20.14 14.3401 20.14 18.6501 18.7C19.8601 18.3 20.3901 16.87 19.7301 15.77L18.5801 13.86C18.2801 13.34 18.0201 12.41 18.0201 11.8V8.91003C18.0201 5.61003 15.3201 2.91003 12.0201 2.91003Z"
                  stroke="#292D32"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                />
                <path
                  d="M13.8699 3.19994C13.5599 3.10994 13.2399 3.03994 12.9099 2.99994C11.9499 2.87994 11.0299 2.94994 10.1699 3.19994C10.4599 2.45994 11.1799 1.93994 12.0199 1.93994C12.8599 1.93994 13.5799 2.45994 13.8699 3.19994Z"
                  stroke="#292D32"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15.02 19.0601C15.02 20.7101 13.67 22.0601 12.02 22.0601C11.2 22.0601 10.44 21.7201 9.90002 21.1801C9.36002 20.6401 9.02002 19.8801 9.02002 19.0601"
                  stroke="#292D32"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                />
              </svg>
            </button>
            <div class="user-info">
              <svg
                class="user-image"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="24" height="24" fill="white" fill-opacity="0.01" />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM12.0321 19C8.67459 19 6.80643 17.2316 6.80643 14V13H17.1158L17.1434 13.9715C17.2358 17.2145 15.4003 19 12.0321 19ZM15.0875 15C14.8526 16.3955 13.9089 17 12.0321 17C10.1563 17 9.18179 16.3902 8.89677 15H15.0875ZM14 8H17V10H14V8ZM10 8H7V10H10V8Z"
                  fill="black"
                />
              </svg>
              <span class="user-name">{employeeName}</span>
            </div>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.5999 7.45837L11.1666 12.8917C10.5249 13.5334 9.4749 13.5334 8.83324 12.8917L3.3999 7.45837"
                stroke="#596780"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
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
            <thead>
              <tr>
                <td>Holiday</td>
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
            <thead>
              <tr>
                <td>Type</td>
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

export default CompanyLeave;
