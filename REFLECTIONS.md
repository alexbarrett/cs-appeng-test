# Reflections
In accordance with the project requirements to deliver "a reflection on what you
would do differently if you had more time," this document attempts to capture my
reflections on what I would do differently if I had more time.

## Project template
I initially started this project using the Electron Forge `webpack-typescript`
template. I didn't enjoy using this template as a starting point due to it
putting little thought into the directory structure and having a poorly thought
out default TypeScript config (the most egregious error being the ES6
compilation target). I eventually switched to the Electron React Boilerplate
project. In the future I would avoid the Electron Forge template, despite its
prominence the official Electron documentation. 

## Build chain
I opted to use vanilla CSS because I did not anticipate needing to do too much
styling. This turned out to be the right choice, but with more time I would
likely set up either SASS or PostCSS to provide a better DX (developer
experience).

## Design system
Normally, I would implement a design system from the ground up. This would
consist of a library of reusable utilities and components from the building
blocks of typography, colour and spacing through to fully-features common
components. This design system could be independently documented and presented
in isolation using a tool like Storybook. Given the scope of this project,
however, such a design system was unnecessary.

## Material Symbols
I added the Material Symbols font to show icons in the application without
considering the weight of the package (in terms of build size, build time or
application start-up speed). It most likely didn't have much effect in these
regards, but with more time I would want to consider the weight of all packages
added to the project. I would also incorporate Material Symbols into the
aforementioned design system.

## CSS reset
I realised midway through development that I had forgotten to include any form
of CSS reset. This wasn't much of a problem - I just had to remove a few default
padding/margin rules and set `box-sizing: border-box` occasionally - but if the
project were to continue I would make sure a CSS reset was included.

## Async handling
I opted to handle asynchronous functionality using the very lightweight
`react-async-hook` package which just exposes a couple of lightweight hooks with
extremely flexible functionality. With more time I would strongly consider how
asynchronous calls should be handled, taking into account the nature of the
async functionality required and trying to put in place easy to understand
patterns designed to minimise potential bugs. I would also look into any recent
developments in React's `Suspense` to see if that could be utilized.

## React Developer Tools
It appears that the `electron-devtools-installer` attempts to install the React
Developer Tools extension into Chromium's DevTools, but this seemingly is not
working. Given time I would look into why this is happening and also look at
what other extensions could be installed to improve the DX.

## Accessibility
With more time I would start to consider accessibility when implementing
features. This would not only improve the application for users with special
considerations, but also improves the DX by making it easier to write good
automated tests.

## Build pipeline
As this is a small project I did not implement any build pipelines. With more
time one of the first things I would do is implement build pipelines to perform
linting, run tests, generate coverage reports, build for production, etc.

## Unit testing
A decent number of unit tests are written, but with more time I would look to
improve the overall coverage and check for missing edge cases.

## Content Security Policy
During development I had to set the CSP to `script-src 'self' 'unsafe-inline'`.
This is not a secure CSP setting, but is necessary to support hot reloading in
development. With more time I would configure the build process to tighten the
CSP restrictions for production builds.

## Cat fact persistence
I chose to store the favourited cat facts in the renderer process's
`localStorage`. With more time I would almost certainly choose to store this
somewhere else, most likely writing directly to the filesystem in an
easy-to-parse, plain text format in the user directory (e.g. `%appdata%` on
Windows). This would have been slower to develop and required more IPC though so
I didn't do this.

## Unimplemented features
These features were not required to fulfil the specifications, but could be
considered nice to haves:

- Order the favourites list by the date/time they were added.
- Persist the selected notification interval between application restarts.
- Focus the application window when a notification is clicked.
- Smarter interval handling instead of resetting the timer every time the
  interval is changed.
- 
## Architectural considerations
When using IPC to implement notifications, I did this via a very simple
`send-notification(title, body)` interface. This minimized the amount of IPC
required and put the renderer process in complete control. With more time I
would spend a lot more time thinking about IPC and what kind of services should
be exposed and how those services should be designed.

An interesting idea that occurred to me towards the end of the project would be
to implemented the project entirely as a web application _first_ - entirely
usable in a web browser - then later turning it into an Electron application via
a separate shell project + optional add-on packages (e.g. OS notifications) for
the webapp that handle IPC with the shell's main process. This method of
development would ensure that the entire application could always be easily
deployed on the web and promote good architecture.

The viability of this approach would depend on the nature of the Electron app
being developed - if its features made extremely heavy use of Electron APIs then
targetting browser environments would be entirely pointless.
