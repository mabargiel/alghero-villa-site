## MODIFIED Requirements

### Requirement: AreaHighlight image order description
The `areaHighlight` Sanity schema's `images` field description SHALL read:
> Kolejność zdjęć musi odpowiadać kolejności stref w kodzie: 1) Wnętrza, 2) Werandy, 3) Ogród, 4) Boisko

#### Scenario: Editor sees updated order description
- **WHEN** an editor opens the `areaHighlight` document in Sanity Studio
- **THEN** the images field help text shows the updated tile order: 1) Wnętrza, 2) Werandy, 3) Ogród, 4) Boisko
