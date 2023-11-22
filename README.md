# Cat Facts

We are prototyping a desktop application that notifies the user on the latest cat facts.

## The Technical Test

We use ElectronJS at CyberSmart. This tech test asks you to build a simple
JavaScript desktop application that queries an API on a periodic basis. The API
we will use is called Cat Fact. The API documentation and endpoint can be found
below:

- https://catfact.ninja/

This is a free API and we cannot commit to its availability. If the API is not
working for you, then please choose another free API and update the user story
accordingly.

_Note: The original API (cat-fact.herokuapp.com) was indeed completely down and
unavailable at the time I did this test. The URL above has been updated
accordingly._

### Desktop Cat Facts

#### Context
We are prototyping a desktop application that notifies the user on the latest
cat facts.

#### Acceptance Criteria
- As a user, when I open my desktop application, then I should see a daily cat
  fact
- As a user, when I hover over the daily cat fact, then I should see the option to add to favourites
- As a user, when I hover over the daily cat fact, then I should see the option
  to delete the cat fact
- As a user, when I click “add to favourites”, then the fact should be available
  under a favourites tab
- As a user, when I add a fact to favourites, another fact should be presented
  to me
- As a user, when I go to the favourites tab, then I should see a list of facts
  I have bookmarked

#### Bonus Acceptance Criteria
- As a user, when I run the application, then I should get a notification of new
  cat facts on a periodic basis
- As a user, when I open the application, then I should be given a choice for
  the frequency in which I want notifications (every 5 mins, every 2 hours,
  etc).

#### Assumptions
- This test assumes a desktop application written in ElectronJS which you also
  have to build in order to implement the ACs above
- There is no user interface designs provided for the application, you are free
  to implement a minimal interface of your choice

#### Definition of Done
- Produced code for presumed functionalities
- Project builds without errors
- Unit tests written and passing
- Project runs on Windows and Mac desktops
- Tech test is delivered as a GitHub repository
- The candidate delivers a reflection on what you would do different if you had
  more time
