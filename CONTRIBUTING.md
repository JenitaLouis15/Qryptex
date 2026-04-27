# Contributing to Qryptex

## Restricted Contribution Policy

This repository is not open to the public. Only authorized Qryptex team members are permitted to contribute.

Any external or unauthorized pull requests will be rejected without review.

---

## Contribution Principles

Qryptex follows a security-first engineering approach. All contributions must meet the following standards:

* Security is mandatory and cannot be compromised
* Code must be scalable and production-ready
* Avoid shortcuts, hacks, or temporary fixes
* Maintain clarity and simplicity in implementation

Any contribution that introduces risk, instability, or technical debt will be rejected.

---

## Access Control

* Only approved team members are granted repository access
* Sharing credentials is strictly prohibited
* All repository activities are monitored

---

## Development Workflow

### Branching Strategy

* `main` — Production-ready code only
* `dev` — Active development branch
* `feature/<name>` — New feature development
* `fix/<name>` — Bug fixes

Direct commits to `main` are not allowed.

---

### Commit Standards

Use a structured commit format:

```
type(scope): short description
```

Examples:

* feat(auth): implement JWT validation
* fix(api): handle null response edge case
* refactor(db): optimize query performance

Avoid unclear commit messages such as "updated code" or "fixed issue".

---

### Pull Request Requirements

Before submitting a pull request:

* Ensure the code is tested
* Remove debug logs and unused code
* Follow the project structure and naming conventions
* Avoid unnecessary dependencies

Each pull request must include:

* A clear description of changes
* The purpose of the implementation
* Any relevant context or dependencies
* Security considerations where applicable

---

## Security Requirements

All contributions must follow secure coding practices:

* Validate and sanitize all inputs
* Do not hardcode secrets or credentials
* Apply the principle of least privilege
* Use trusted and well-maintained libraries

Any code that weakens system security will be rejected.

---

## Testing Standards

* Test all changes before submitting
* Ensure no existing functionality is broken
* Handle edge cases appropriately

Untested or unstable code will not be accepted.

---

## Code Quality Standards

* Write clean and maintainable code
* Keep functions modular and focused
* Follow consistent naming conventions
* Remove unused or dead code

Poorly structured or unreadable code will be rejected.

---

## Rejection Criteria

A pull request will be rejected if it:

* Contains security vulnerabilities
* Breaks existing functionality
* Does not follow contribution guidelines
* Is incomplete, untested, or poorly structured
* Introduces unnecessary complexity

---

## Internal Communication

All discussions and coordination must happen through official internal channels or tracked issues.

Assumptions are not acceptable. Clarify requirements before implementation.

---

## Final Note

Qryptex maintains production-level standards across all systems.

Every contribution must reflect disciplined engineering, security awareness, and long-term scalability.
