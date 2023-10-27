import React from "react";

export default function AboutPage() {
   return (
      <>
         <header className="header">
            <h1 className="banner">Healthify</h1>
         </header>

         <main id="about-main">
            <div id="about-page-text">
               <h1>Healthify - A Healthier Shopping Experience</h1>
               <h2>Group Name: Just Desserts</h2>
               <p>
                  <strong>Authors/Contributors:</strong> Joey Hernandez, Thomas
                  Kennedy, Riley Mapel, Alek Sevilla
               </p>
               <p>
                  <strong>Course:</strong> Capstone Project Fall, 2023
               </p>
               <p>
                  <strong>University:</strong> The University of West Florida
               </p>
               <hr />
               <h2>Project Overview</h2>
               <p>
                  Heathify is a store application in which users are incentivized to
                  purchase healthier options within the store's stock to obtain
                  points; when enough points are earned, they may cash in said points
                  for discounts and or free items within the store.
               </p>
               <p>
                  Our goal is to encourage people to improve their eating habits.
                  Since there are very few incentives monetarily wise to purchase and
                  eat healthy items, our application will remedy that by making it
                  more beneficial for a user to purchase healthier options.
               </p>
               <p>
                  Please note that this project is a demo for a school assignment and
                  is non-commercial.
               </p>
               <hr />
               <h2>Technologies Used</h2>
               <ul>
                  <li>
                     <strong>Frontend:</strong>
                     <ul>
                        <li>
                           Codebase written in <strong>React</strong>
                        </li>
                        <li>
                           Build tool: <strong>Vite</strong>
                        </li>
                     </ul>
                  </li>
               </ul>
               <hr />
               <h2>Team Roles</h2>
               <ul>
                  <li>
                     <p>
                        <strong>Joey Hernandez</strong>:
                     </p>
                     <ul>
                        <li>Team Lead</li>
                        <li>Software Engineering Lead</li>
                        <li>
                           Responsibilities:
                           <ul>
                              <li>Maintaining the software development model</li>
                              <li>
                                 Ensuring proper communication within the development team
                              </li>
                              <li>Adhering to good programming practices</li>
                           </ul>
                        </li>
                     </ul>
                  </li>
                  <li>
                     <p>
                        <strong>Thomas Kennedy</strong>:
                     </p>
                     <ul>
                        <li>Testing Lead</li>
                        <li>
                           Responsibilities:
                           <ul>
                              <li>Conducting various tests on code components</li>
                              <li>Ensuring functionality throughout the codebase</li>
                           </ul>
                        </li>
                     </ul>
                  </li>
                  <li>
                     <p>
                        <strong>Riley Mapel</strong>:
                     </p>
                     <ul>
                        <li>Coding Lead</li>
                        <li>
                           Responsibilities:
                           <ul>
                              <li>Implementing clean code methodology</li>
                              <li>Overseeing code functionality</li>
                           </ul>
                        </li>
                     </ul>
                  </li>
                  <li>
                     <p>
                        <strong>Alek Sevilla</strong>:
                     </p>
                     <ul>
                        <li>Security Lead</li>
                        <li>
                           Responsibilities:
                           <ul>
                              <li>Ensuring security within the development cycle</li>
                              <li>Applying secure software development practices</li>
                           </ul>
                        </li>
                     </ul>
                  </li>
               </ul>
               <hr />
               <h2>Data Sources</h2>
               <p>
                  We would like to credit the following sources for their
                  contributions:
               </p>
               <ul>
                  <li>
                     Product images and information gathered from&nbsp;
                     <a href="https://www.kaggle.com/datasets/validmodel/grocery-store-dataset">
                        Kaggle Grocery Store Dataset
                     </a>&nbsp;
                     (originally from <a href="https://www.hemkop.se">hemkop</a>)
                  </li>
                  <li>
                     Banner image by&nbsp;
                     <a href="https://stocksnap.io/photo/food-fruits-AWJD4WV6W1">
                        StockSnap
                     </a>
                  </li>
                  <li>
                     Shopping cart icon from&nbsp;
                     <a href="https://fontawesome.com">Font Awesome</a>
                  </li>
                  <li>
                     Nutrition grade evaluations from&nbsp;
                     <a href="https://world.openfoodfacts.org">Open Food Facts</a>
                  </li>
               </ul>
               <hr />
               <h2>GitHub Pages</h2>
               <p>
                  This project is hosted on&nbsp;
                  <a href="https://justdessertscapstone.github.io/shop/">
                     GitHub Pages
                  </a>
                  .
               </p>
               <hr />
               <p>
                  Thank you for checking out Healthify by the &quot;Just
                  Desserts&quot; team!
               </p>
               <hr />
               <p>
                  <em>
                     This project is a demo for a school project and is not a
                     functioning shop. It is non-commercial.
                  </em>
               </p>
            </div>
         </main>

         <footer>
            <p>
               Within Healthify, you will find that being rewarded for making better
               choices is so rewarding!
            </p>
         </footer>
      </>
   );
}
