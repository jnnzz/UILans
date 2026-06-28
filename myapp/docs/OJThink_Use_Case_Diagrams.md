# OJThink UML Use Case Diagrams

System: **OJThink (OJT Lifecycle Management System)**

These diagrams follow the finalized OJThink scope. PlantUML is the normative
UML 2.x representation. Mermaid does not provide a native UML use-case diagram
type, so the Mermaid versions use flowcharts with actors, system boundaries,
use-case-shaped nodes, associations, and labeled dependency arrows.

Terminology correction:

- "Submit Proposed Company (Track B)" is modeled as **Submit Company
  Verification Request**.
- Company Verification only verifies an outside company candidate.
- The official Track A or Track B classification happens only when the OJT
  Coordinator accepts the Acceptance Confirmation / Confirmation Slip.

---

## 1. Student Use Case Diagram

### UML Use Case Diagram

```mermaid
flowchart LR
    Student[Student]

    subgraph OJThink["OJThink - Student Functions"]
        direction TB
        subgraph Access["Account"]
            S1([Login])
            S2([Manage Profile])
            S3([Logout])
        end

        subgraph Discovery["Company Discovery and Placement"]
            S4([View UC-CCS Workspace])
            S5([Browse Opportunity Board])
            S6([View AI Posting Match])
            S7([Select Listed Company for Track A])
            S8([Submit Company Verification Request])
            S9([Upload Acceptance Confirmation Form])
        end

        subgraph Requirements["Requirement Submissions"]
            S10([Submit Pre-OJT Requirements])
            S11([Submit Midterm Requirements])
            S12([Submit Finals Requirements])
            S13([Submit MOA / Academic Documents])
            SI1([Upload Requirement Files])
        end

        subgraph Records["DTR and Journal"]
            S14([Record QR-Based Attendance])
            S15([Record Manual DTR / TITO])
            S16([Submit Final DTR / TITO Package])
            SI2([Upload Supporting Proof])
            S17([Record Daily Journal])
            S18([Submit Final Journal Package])
            SI3([Upload Journal Entries])
        end

        subgraph Completion["Progress and Completion"]
            S19([Submit Completion Documents])
            S20([View Progress Dashboard])
            S21([View AI Progress Summary])
        end
    end

    Student --- S1
    Student --- S2
    Student --- S3
    Student --- S4
    Student --- S5
    Student --- S7
    Student --- S8
    Student --- S9
    Student --- S10
    Student --- S11
    Student --- S12
    Student --- S13
    Student --- S14
    Student --- S15
    Student --- S16
    Student --- S17
    Student --- S18
    Student --- S19
    Student --- S20

    S6 -. "<<extend>>" .-> S5
    S21 -. "<<extend>>" .-> S20
    S10 -. "<<include>>" .-> SI1
    S11 -. "<<include>>" .-> SI1
    S12 -. "<<include>>" .-> SI1
    S13 -. "<<include>>" .-> SI1
    S16 -. "<<include>>" .-> SI2
    S18 -. "<<include>>" .-> SI3
```

### PlantUML Code

```plantuml
@startuml OJThink_Student_Use_Cases
left to right direction
skinparam packageStyle rectangle
skinparam shadowing false

actor Student

rectangle "OJThink\n(OJT Lifecycle Management System)" {
  package "Account" {
    usecase "Login" as S1
    usecase "Manage Profile" as S2
    usecase "Logout" as S3
  }

  package "Company Discovery and Placement" {
    usecase "View UC-CCS Workspace" as S4
    usecase "Browse Opportunity Board" as S5
    usecase "View AI Posting Match" as S6
    usecase "Select Listed Company\nfor Track A" as S7
    usecase "Submit Company\nVerification Request" as S8
    usecase "Upload Acceptance\nConfirmation Form" as S9
  }

  package "Requirement Submissions" {
    usecase "Submit Pre-OJT\nRequirements" as S10
    usecase "Submit Midterm\nRequirements" as S11
    usecase "Submit Finals\nRequirements" as S12
    usecase "Submit MOA /\nAcademic Documents" as S13
    usecase "Upload Requirement Files" as SI1
  }

  package "DTR and Journal" {
    usecase "Record QR-Based\nAttendance" as S14
    usecase "Record Manual\nDTR / TITO" as S15
    usecase "Submit Final DTR /\nTITO Package" as S16
    usecase "Upload Supporting Proof" as SI2
    usecase "Record Daily Journal" as S17
    usecase "Submit Final\nJournal Package" as S18
    usecase "Upload Journal Entries" as SI3
  }

  package "Progress and Completion" {
    usecase "Submit Completion\nDocuments" as S19
    usecase "View Progress Dashboard" as S20
    usecase "View AI Progress Summary" as S21
  }
}

Student -- S1
Student -- S2
Student -- S3
Student -- S4
Student -- S5
Student -- S7
Student -- S8
Student -- S9
Student -- S10
Student -- S11
Student -- S12
Student -- S13
Student -- S14
Student -- S15
Student -- S16
Student -- S17
Student -- S18
Student -- S19
Student -- S20

S6 ..> S5 : <<extend>>
S21 ..> S20 : <<extend>>
S10 ..> SI1 : <<include>>
S11 ..> SI1 : <<include>>
S12 ..> SI1 : <<include>>
S13 ..> SI1 : <<include>>
S16 ..> SI2 : <<include>>
S18 ..> SI3 : <<include>>
@enduml
```

### Mermaid Code

```mermaid
flowchart LR
    Student[Student]
    subgraph SYS["OJThink - Student Functions"]
        S1([Login])
        S2([Manage Profile])
        S3([Logout])
        S4([View UC-CCS Workspace])
        S5([Browse Opportunity Board])
        S6([View AI Posting Match])
        S7([Select Listed Company for Track A])
        S8([Submit Company Verification Request])
        S9([Upload Acceptance Confirmation Form])
        S10([Submit Pre-OJT Requirements])
        S11([Submit Midterm Requirements])
        S12([Submit Finals Requirements])
        S13([Submit MOA / Academic Documents])
        SI1([Upload Requirement Files])
        S14([Record QR-Based Attendance])
        S15([Record Manual DTR / TITO])
        S16([Submit Final DTR / TITO Package])
        SI2([Upload Supporting Proof])
        S17([Record Daily Journal])
        S18([Submit Final Journal Package])
        SI3([Upload Journal Entries])
        S19([Submit Completion Documents])
        S20([View Progress Dashboard])
        S21([View AI Progress Summary])
    end
    Student --- S1 & S2 & S3 & S4 & S5 & S7 & S8 & S9
    Student --- S10 & S11 & S12 & S13 & S14 & S15
    Student --- S16 & S17 & S18 & S19 & S20
    S6 -. "<<extend>>" .-> S5
    S21 -. "<<extend>>" .-> S20
    S10 -. "<<include>>" .-> SI1
    S11 -. "<<include>>" .-> SI1
    S12 -. "<<include>>" .-> SI1
    S13 -. "<<include>>" .-> SI1
    S16 -. "<<include>>" .-> SI2
    S18 -. "<<include>>" .-> SI3
```

### Relationship Explanation

- Requirement submission includes file upload because the submission cannot be
  completed without its required files.
- Final DTR submission includes supporting proof.
- Final journal submission includes the journal entries in the package.
- AI Posting Match optionally extends browsing the Opportunity Board.
- AI Progress Summary optionally extends the Progress Dashboard.
- Company Verification is intentionally separate from official Track B
  classification.

---

## 2. OJT Coordinator Use Case Diagram

### UML Use Case Diagram

```mermaid
flowchart LR
    Coordinator[OJT Coordinator]

    subgraph OJThink["OJThink - Coordinator Functions"]
        direction TB
        C1([Login])
        C2([View Coordinator Dashboard])
        C3([Monitor Student Checklist])
        C4([Review Company Verification Request])
        C5([Review Acceptance Confirmation])
        C6([Review Pre-OJT Requirements])
        C7([Review Midterm Requirements])
        C8([Review Finals Requirements])
        C9([Review MOA Documents])
        C10([Review Final DTR / TITO Package])
        C11([Review Final Journal Package])
        C12([Review Completion Documents])
        C13([Monitor Track B Queue])
        C14([Generate Reports])
        C15([View AI Progress Summary])
        C16([Logout])
        CI1([Record Review Decision])
        CI2([Verify Submitted Files])
        CI3([Retrieve Student Records])
        CE1([Accept Submission])
        CE2([Request Revision])
        CE3([Reject Submission])
    end

    Coordinator --- C1 & C2 & C3 & C4 & C5 & C6 & C7 & C8
    Coordinator --- C9 & C10 & C11 & C12 & C13 & C14 & C16

    C4 -. "<<include>>" .-> CI1
    C5 -. "<<include>>" .-> CI1
    C6 -. "<<include>>" .-> CI1
    C7 -. "<<include>>" .-> CI1
    C8 -. "<<include>>" .-> CI1
    C9 -. "<<include>>" .-> CI1
    C10 -. "<<include>>" .-> CI1
    C11 -. "<<include>>" .-> CI1
    C12 -. "<<include>>" .-> CI1
    C12 -. "<<include>>" .-> CI2
    C14 -. "<<include>>" .-> CI3
    C15 -. "<<extend>>" .-> C2
    CE1 -. "<<extend>>" .-> CI1
    CE2 -. "<<extend>>" .-> CI1
    CE3 -. "<<extend>>" .-> CI1
```

### PlantUML Code

```plantuml
@startuml OJThink_Coordinator_Use_Cases
left to right direction
skinparam packageStyle rectangle
skinparam shadowing false

actor "OJT Coordinator" as Coordinator

rectangle "OJThink\n(OJT Lifecycle Management System)" {
  package "Access and Monitoring" {
    usecase "Login" as C1
    usecase "View Coordinator\nDashboard" as C2
    usecase "Monitor Student\nChecklist" as C3
    usecase "Monitor Track B Queue" as C13
    usecase "View AI Progress\nSummary" as C15
    usecase "Logout" as C16
  }

  package "Placement Review" {
    usecase "Review Company\nVerification Request" as C4
    usecase "Review Acceptance\nConfirmation" as C5
  }

  package "Requirement Review" {
    usecase "Review Pre-OJT\nRequirements" as C6
    usecase "Review Midterm\nRequirements" as C7
    usecase "Review Finals\nRequirements" as C8
    usecase "Review MOA Documents" as C9
    usecase "Review Final DTR /\nTITO Package" as C10
    usecase "Review Final\nJournal Package" as C11
    usecase "Review Completion\nDocuments" as C12
    usecase "Verify Submitted Files" as CI2
    usecase "Record Review Decision" as CI1
    usecase "Accept Submission" as CE1
    usecase "Request Revision" as CE2
    usecase "Reject Submission" as CE3
  }

  package "Reporting" {
    usecase "Generate Reports" as C14
    usecase "Retrieve Student Records" as CI3
  }
}

Coordinator -- C1
Coordinator -- C2
Coordinator -- C3
Coordinator -- C4
Coordinator -- C5
Coordinator -- C6
Coordinator -- C7
Coordinator -- C8
Coordinator -- C9
Coordinator -- C10
Coordinator -- C11
Coordinator -- C12
Coordinator -- C13
Coordinator -- C14
Coordinator -- C16

C4 ..> CI1 : <<include>>
C5 ..> CI1 : <<include>>
C6 ..> CI1 : <<include>>
C7 ..> CI1 : <<include>>
C8 ..> CI1 : <<include>>
C9 ..> CI1 : <<include>>
C10 ..> CI1 : <<include>>
C11 ..> CI1 : <<include>>
C12 ..> CI1 : <<include>>
C12 ..> CI2 : <<include>>
C14 ..> CI3 : <<include>>
C15 ..> C2 : <<extend>>
CE1 ..> CI1 : <<extend>>
CE2 ..> CI1 : <<extend>>
CE3 ..> CI1 : <<extend>>
@enduml
```

### Mermaid Code

```mermaid
flowchart LR
    Coordinator[OJT Coordinator]
    subgraph SYS["OJThink - Coordinator Functions"]
        C1([Login])
        C2([View Coordinator Dashboard])
        C3([Monitor Student Checklist])
        C4([Review Company Verification Request])
        C5([Review Acceptance Confirmation])
        C6([Review Pre-OJT Requirements])
        C7([Review Midterm Requirements])
        C8([Review Finals Requirements])
        C9([Review MOA Documents])
        C10([Review Final DTR / TITO Package])
        C11([Review Final Journal Package])
        C12([Review Completion Documents])
        C13([Monitor Track B Queue])
        C14([Generate Reports])
        C15([View AI Progress Summary])
        C16([Logout])
        CI1([Record Review Decision])
        CI2([Verify Submitted Files])
        CI3([Retrieve Student Records])
        CE1([Accept Submission])
        CE2([Request Revision])
        CE3([Reject Submission])
    end
    Coordinator --- C1 & C2 & C3 & C4 & C5 & C6 & C7 & C8
    Coordinator --- C9 & C10 & C11 & C12 & C13 & C14 & C16
    C4 -. "<<include>>" .-> CI1
    C5 -. "<<include>>" .-> CI1
    C6 -. "<<include>>" .-> CI1
    C7 -. "<<include>>" .-> CI1
    C8 -. "<<include>>" .-> CI1
    C9 -. "<<include>>" .-> CI1
    C10 -. "<<include>>" .-> CI1
    C11 -. "<<include>>" .-> CI1
    C12 -. "<<include>>" .-> CI1
    C12 -. "<<include>>" .-> CI2
    C14 -. "<<include>>" .-> CI3
    C15 -. "<<extend>>" .-> C2
    CE1 -. "<<extend>>" .-> CI1
    CE2 -. "<<extend>>" .-> CI1
    CE3 -. "<<extend>>" .-> CI1
```

### Relationship Explanation

- Each official review includes recording a review decision.
- Accept, Request Revision, and Reject extend the decision because they are
  mutually exclusive conditional outcomes. They are not modeled as mandatory
  includes.
- Completion review includes verifying submitted files.
- Report generation includes retrieving the relevant student records.
- AI Progress Summary optionally extends the Coordinator Dashboard.

---

## 3. Company Supervisor Use Case Diagram

### UML Use Case Diagram

```mermaid
flowchart LR
    Company["Company Supervisor"]

    subgraph OJThink["OJThink - Company Supervisor Functions"]
        direction TB
        P1([Login])
        P2([Manage Company Profile])
        P3([Manage Company Workspace])
        P4([Create Job Posting])
        P5([Edit Job Posting])
        P6([Close Job Posting])
        P7([View Officially Placed Students])
        P8([Generate QR Attendance])
        P9([View Attendance Records])
        P10([Upload Company Instructions])
        P11([Upload Evaluation Documents])
        P12([Logout])
        PI1([Upload Company Files])
        PI2([Enter Posting Details])
        PI3([Select Student])
    end

    Company --- P1 & P2 & P3 & P4 & P5 & P6
    Company --- P7 & P8 & P9 & P10 & P11 & P12
    PI1 -. "<<extend>>" .-> P3
    P10 -. "<<extend>>" .-> P3
    P4 -. "<<include>>" .-> PI2
    P5 -. "<<include>>" .-> PI2
    P8 -. "<<include>>" .-> PI3
```

### PlantUML Code

```plantuml
@startuml OJThink_Company_Supervisor_Use_Cases
left to right direction
skinparam packageStyle rectangle
skinparam shadowing false

actor "Company Supervisor" as Company

rectangle "OJThink\n(OJT Lifecycle Management System)" {
  package "Access and Company Workspace" {
    usecase "Login" as P1
    usecase "Manage Company Profile" as P2
    usecase "Manage Company Workspace" as P3
    usecase "Upload Company Files" as PI1
    usecase "Upload Company Instructions" as P10
    usecase "Logout" as P12
  }

  package "Opportunity Postings" {
    usecase "Create Job Posting" as P4
    usecase "Edit Job Posting" as P5
    usecase "Close Job Posting" as P6
    usecase "Enter Posting Details" as PI2
  }

  package "Placed Students and Support" {
    usecase "View Officially\nPlaced Students" as P7
    usecase "Generate QR Attendance" as P8
    usecase "Select Student" as PI3
    usecase "View Attendance Records" as P9
    usecase "Upload Evaluation\nDocuments" as P11
  }
}

Company -- P1
Company -- P2
Company -- P3
Company -- P4
Company -- P5
Company -- P6
Company -- P7
Company -- P8
Company -- P9
Company -- P10
Company -- P11
Company -- P12

PI1 ..> P3 : <<extend>>
P10 ..> P3 : <<extend>>
P4 ..> PI2 : <<include>>
P5 ..> PI2 : <<include>>
P8 ..> PI3 : <<include>>
@enduml
```

### Mermaid Code

```mermaid
flowchart LR
    Company["Company Supervisor"]
    subgraph SYS["OJThink - Company Supervisor Functions"]
        P1([Login])
        P2([Manage Company Profile])
        P3([Manage Company Workspace])
        P4([Create Job Posting])
        P5([Edit Job Posting])
        P6([Close Job Posting])
        P7([View Officially Placed Students])
        P8([Generate QR Attendance])
        P9([View Attendance Records])
        P10([Upload Company Instructions])
        P11([Upload Evaluation Documents])
        P12([Logout])
        PI1([Upload Company Files])
        PI2([Enter Posting Details])
        PI3([Select Student])
    end
    Company --- P1 & P2 & P3 & P4 & P5 & P6
    Company --- P7 & P8 & P9 & P10 & P11 & P12
    PI1 -. "<<extend>>" .-> P3
    P10 -. "<<extend>>" .-> P3
    P4 -. "<<include>>" .-> PI2
    P5 -. "<<include>>" .-> PI2
    P8 -. "<<include>>" .-> PI3
```

### Relationship Explanation

- Creating or editing a posting includes entering posting details.
- QR attendance includes selecting the relevant officially placed student.
- Uploading company files and instructions extend workspace management because
  they are optional workspace-management actions.
- No application review, interview, or hiring use case is included because
  those activities happen outside OJThink.

---

## 4. System Administrator Use Case Diagram

### UML Use Case Diagram

```mermaid
flowchart LR
    Admin["System Administrator"]

    subgraph OJThink["OJThink - System Administrator Functions"]
        direction TB
        A1([Login])
        A2([Manage User Accounts])
        A3([Manage Company Accounts])
        A4([Manage Roles and Permissions])
        A5([Manage Workspaces])
        A6([Configure Requirement Templates])
        A7([Configure OJT Settings])
        A8([Maintain System Records])
        A9([Monitor Audit Logs])
        A10([Logout])
        AE1([Create Account])
        AE2([Activate Account])
        AE3([Deactivate Account])
        AE4([Assign User Role])
        AI1([Edit Requirement List])
        AE5([Update Company Records])
    end

    Admin --- A1 & A2 & A3 & A4 & A5 & A6 & A7 & A8 & A9 & A10
    AE1 -. "<<extend>>" .-> A2
    AE2 -. "<<extend>>" .-> A2
    AE3 -. "<<extend>>" .-> A2
    AE4 -. "<<extend>>" .-> A4
    A6 -. "<<include>>" .-> AI1
    AE5 -. "<<extend>>" .-> A8
```

### PlantUML Code

```plantuml
@startuml OJThink_System_Administrator_Use_Cases
left to right direction
skinparam packageStyle rectangle
skinparam shadowing false

actor "System Administrator" as Admin

rectangle "OJThink\n(OJT Lifecycle Management System)" {
  package "Access" {
    usecase "Login" as A1
    usecase "Logout" as A10
  }

  package "Accounts and Access Control" {
    usecase "Manage User Accounts" as A2
    usecase "Create Account" as AE1
    usecase "Activate Account" as AE2
    usecase "Deactivate Account" as AE3
    usecase "Manage Company Accounts" as A3
    usecase "Manage Roles and\nPermissions" as A4
    usecase "Assign User Role" as AE4
  }

  package "System Configuration" {
    usecase "Manage Workspaces" as A5
    usecase "Configure Requirement\nTemplates" as A6
    usecase "Edit Requirement List" as AI1
    usecase "Configure OJT Settings" as A7
    usecase "Maintain System Records" as A8
    usecase "Update Company Records" as AE5
  }

  package "Audit" {
    usecase "Monitor Audit Logs" as A9
  }
}

Admin -- A1
Admin -- A2
Admin -- A3
Admin -- A4
Admin -- A5
Admin -- A6
Admin -- A7
Admin -- A8
Admin -- A9
Admin -- A10

AE1 ..> A2 : <<extend>>
AE2 ..> A2 : <<extend>>
AE3 ..> A2 : <<extend>>
AE4 ..> A4 : <<extend>>
A6 ..> AI1 : <<include>>
AE5 ..> A8 : <<extend>>
@enduml
```

### Mermaid Code

```mermaid
flowchart LR
    Admin["System Administrator"]
    subgraph SYS["OJThink - System Administrator Functions"]
        A1([Login])
        A2([Manage User Accounts])
        A3([Manage Company Accounts])
        A4([Manage Roles and Permissions])
        A5([Manage Workspaces])
        A6([Configure Requirement Templates])
        A7([Configure OJT Settings])
        A8([Maintain System Records])
        A9([Monitor Audit Logs])
        A10([Logout])
        AE1([Create Account])
        AE2([Activate Account])
        AE3([Deactivate Account])
        AE4([Assign User Role])
        AI1([Edit Requirement List])
        AE5([Update Company Records])
    end
    Admin --- A1 & A2 & A3 & A4 & A5 & A6 & A7 & A8 & A9 & A10
    AE1 -. "<<extend>>" .-> A2
    AE2 -. "<<extend>>" .-> A2
    AE3 -. "<<extend>>" .-> A2
    AE4 -. "<<extend>>" .-> A4
    A6 -. "<<include>>" .-> AI1
    AE5 -. "<<extend>>" .-> A8
```

### Relationship Explanation

- Create, Activate, and Deactivate Account extend account management because
  they are alternative actions, not steps that always happen together.
- Assign User Role optionally extends role and permission management.
- Configuring requirement templates includes editing the requirement list.
- Updating company records optionally extends system-record maintenance.
- No academic approval use cases are assigned to the administrator.

---

## Modeling Notes

1. Login and Logout are associated directly with each actor. They are not
   included by every use case because that would add unnecessary dependency
   lines and imply repeated authentication.
2. Approve and Reject are not both included by a review. They are mutually
   exclusive outcomes, so they extend the shared Record Review Decision use
   case.
3. Track A / Track B is officially saved only after the coordinator accepts the
   Acceptance Confirmation / Confirmation Slip.
4. Company Verification does not confirm placement, route a workspace, or
   activate DTR and journal tracking.
5. Daily DTR and journal records are student-maintained. Only final packages
   are coordinator-reviewed.
