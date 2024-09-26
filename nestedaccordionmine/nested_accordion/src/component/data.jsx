
// import Accordion from './Accordian';

import FluentAccordion from "./accordion";

const data = {
    "accounts": [
      {
        "account_id": "1",
        "name": "Account One",
        "industry": "Technology",
        "location": "New York",
        "contacts": [
          {
            "contact_id": "1",
            "first_name": "John",
            "last_name": "Doe",
            "email": "john.doe@example.com",
            "phone": "123-456-7890"
          },
          {
            "contact_id": "2",
            "first_name": "Jane",
            "last_name": "Smith",
            "email": "jane.smith@example.com",
            "phone": "098-765-4321"
          }
        ],
        "cases": [
          {
            "case_id": "1",
            "title": "Case One",
            "description": "Description of case one",
            "status": "Open"
          },
          {
            "case_id": "2",
            "title": "Case Two",
            "description": "Description of case two",
            "status": "Closed"
          },
          {
            "case_id": "3",
            "title": "Case Three",
            "description": "Description of case three",
            "status": "In Progress"
          },
          {
            "case_id":"4",
            "title": "Case Four",
            "description": "Description of case Four",
            "status": "In Progress",
            // "Name":[
            //   {
            //     "Hii":"Hellow",
            //     "test":[
            //       {
            //         "bst" : "hhsdshdsd",
            //       }
            //     ]
            //   }
            // ]

          }
        ]
      },
      {
        "account_id": "2",
        "name": "Account Two",
        "industry": "Finance",
        "location": "San Francisco",
        "contacts": [
          {
            "contact_id": "3",
            "first_name": "Alice",
            "last_name": "Johnson",
            "email": "alice.johnson@example.com",
            "phone": "123-123-1234"
          },
          {
            "contact_id": "4",
            "first_name": "Bob",
            "last_name": "Brown",
            "email": "bob.brown@example.com",
            "phone": "321-321-4321"
          },
          {
            "contact_id": "5",
            "first_name": "Charlie",
            "last_name": "Davis",
            "email": "charlie.davis@example.com",
            "phone": "555-555-5555"
          },
          {
            "contact_id": "6",
            "first_name": "Diana",
            "last_name": "Evans",
            "email": "diana.evans@example.com",
            "phone": "666-666-6666"
          },
          {
            "contact_id": "7",
            "first_name": "Eve",
            "last_name": "Foster",
            "email": "eve.foster@example.com",
            "phone": "777-777-7777"
          }
        ],
        "cases": [],
        "Test":[
            {
                "Name":"test"
            }
        ],
        "Rest":[
           {
             "Email":"test@gmail.com"
           }
        ]
      },
      {
        "account_id": "3",
        "name": "Account Three",
        "industry": "Healthcare",
        "location": "Chicago",
        "contacts": [],
        "cases": []
      },
      {
        "account_id": "4",
        "name": "Account Four",
        "industry": "Retail",
        "location": "Los Angeles",
        "contacts": [],
        "cases": []
      }
    ],
    "contact": [
      {
        "account_id": "1",
        "name": "Account One",
        "industry": "Technology",
        "location": "New York",
        "contacts": [
          {
            "contact_id": "1",
            "first_name": "John",
            "last_name": "Doe",
            "email": "john.doe@example.com",
            "phone": "123-456-7890"
          },
          {
            "contact_id": "2",
            "first_name": "Jane",
            "last_name": "Smith",
            "email": "jane.smith@example.com",
            "phone": "098-765-4321"
          }
        ],
        "cases": [
          {
            "case_id": "1",
            "title": "Case One",
            "description": "Description of case one",
            "status": "Open"
          },
          {
            "case_id": "2",
            "title": "Case Two",
            "description": "Description of case two",
            "status": "Closed"
          },
          {
            "case_id": "3",
            "title": "Case Three",
            "description": "Description of case three",
            "status": "In Progress"
          },
          {
            "case_id":"4",
            "title": "Case Four",
            "description": "Description of case Four",
            "status": "In Progress",
            // "Name":[
            //   {
            //     "Hii":"Hellow",
            //     "test":[
            //       {
            //         "bst" : "hhsdshdsd",
            //       }
            //     ]
            //   }
            // ]

          }
        ]
      },
      {
        "account_id": "2",
        "name": "Account Two",
        "industry": "Finance",
        "location": "San Francisco",
        "contacts": [
          {
            "contact_id": "3",
            "first_name": "Alice",
            "last_name": "Johnson",
            "email": "alice.johnson@example.com",
            "phone": "123-123-1234"
          },
          {
            "contact_id": "4",
            "first_name": "Bob",
            "last_name": "Brown",
            "email": "bob.brown@example.com",
            "phone": "321-321-4321"
          },
          {
            "contact_id": "5",
            "first_name": "Charlie",
            "last_name": "Davis",
            "email": "charlie.davis@example.com",
            "phone": "555-555-5555"
          },
          {
            "contact_id": "6",
            "first_name": "Diana",
            "last_name": "Evans",
            "email": "diana.evans@example.com",
            "phone": "666-666-6666"
          },
          {
            "contact_id": "7",
            "first_name": "Eve",
            "last_name": "Foster",
            "email": "eve.foster@example.com",
            "phone": "777-777-7777"
          }
        ],
        "cases": [],
        "Test":[
            {
                "Name":"test"
            }
        ],
        "Rest":[
           {
             "Email":"test@gmail.com"
           }
        ]
      },
      {
        "account_id": "3",
        "name": "Account Three",
        "industry": "Healthcare",
        "location": "Chicago",
        "contacts": [],
        "cases": []
      },
      {
        "account_id": "4",
        "name": "Account Four",
        "industry": "Retail",
        "location": "Los Angeles",
        "contacts": [],
        "cases": []
      }
    ]
  };


  
const Data = () => {
  return (
    <div>

       <FluentAccordion accounts={data.accounts} />
    </div>
  );
};

export default Data;
