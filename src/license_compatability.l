@Engine("sqlite");
@DefineFlag("database_file");
@AttachDatabase("db", "data/backend.sqlite");

# Predicate LicensePermissions -> Aggregates the actions a license permits
LicensePermission(license_name:, action_name:) distinct :- 
    licenses(id: license_id, name:license_name), 
    actions(id:action_id, name: action_name), 
    permissions(actionid:permissions_action_id, licenseid: permissions_license_id), 
    (license_id ==permissions_license_id, action_id == permissions_action_id);

LicensePermissions(license_name:, action_names? List= action_name) distinct :- 
    LicensePermission(license_name:, action_name:);

# Predicate LicenseProhibitions -> Aggregates the actions a license prohibits
LicenseProhibitions(license_name:, action_names? List= action_name) distinct :-
    licenses(id: license_id, name:license_name), 
    actions(id: action_id, name: action_name),
    prohibitions(actionid: prohibitions_action_id, licenseid: prohibitions_license_id),
    (license_id == prohibitions_license_id, action_id == prohibitions_action_id);

# Predicate LicenseDuties -> Aggregates the actions a license requires
LicenseDuties(license_name:, action_names? List= action_name) distinct :-
    licenses(id: license_id, name:license_name),
    actions(id:action_id, name: action_name),
    duties(actionid:duties_action_id, licenseid: duties_license_id),
    (license_id == duties_license_id, action_id == duties_action_id);

# Predicate AreEqual -> Checks if two items are the same
AreEqual(array1, array2) = result :- result == (array1 == array2);

# Predicate CountPermissions -> Checks the number of permissions by license_name
CountPermissions(license_name:, count? += 1) distinct :-
    LicensePermission(license_name:, action_name:);

# Predicate CountPermissions -> Checks the number of permissions that occur in both licenses
CountCombinedPermissions(license_name1:, license_name2:, count? += 1) distinct :-
    LicensePermissions(license_name: license_name1, action_names: permissions1),
    LicensePermissions(license_name: license_name2, action_names: permissions2),
    Constraint(permission1 == permission2), 
    permission1 in permissions1,
    permission2 in permissions2;

# Predicate IsSubsetOf -> Checks if a set of permissions is part of another set of instructions
IsSubsetOf(license_name1:, license_name2:) = result distinct :-
    CountPermissions(license_name: license_name1, count: count1), 
    CountCombinedPermissions(license_name1:, license_name2:, count: count2), 
    result == (count1 == count2);

# Predicate PermissionsAreCompatible -> Checks if the permissions of two licenses are compatible
PermissionsAreCompatible(license1:, license2:) distinct :-
    LicensePermissions(license_name: license1, action_names: permissions1),
    LicensePermissions(license_name: license2, action_names: permissions2),
    partial == IsSubsetOf(license_name1: license1, license_name2: license2),
    complete == AreEqual(permissions1, permissions2),
    compatible == (partial || complete),
    Constraint(compatible);
    
# Predicate HaveCommonPermissionsAndProhibitions -> Checks if permissions are prohibited by another license
HaveCommonPermissionsAndProhibitions(license1:, license2:) distinct :-
    LicensePermissions(license_name: license1, action_names: permissions),
    LicenseProhibitions(license_name: license2, action_names: prohibitions),
    Constraint(permission == prohibition),
    permission in permissions,
    prohibition in prohibitions;

# Predicate HaveCommonDutiesAndProhibitions -> Checks if duties are prohibited by another license
HaveCommonDutiesAndProhibitions(license1:, license2:) distinct :-
    LicenseDuties(license_name: license1, action_names: duties),
    LicenseProhibitions(license_name: license2, action_names: prohibitions),
    Constraint(duty == prohibition),
    duty in duties,
    prohibition in prohibitions;

# Predicate AreCompatible -> Checks if two licenses are compatible according to the defined rules
AreCompatible(license1:, license2:) distinct :- 
    PermissionsAreCompatible(license1:, license2:),
    PermissionsAreCompatible(license2:, license1:),
    ~HaveCommonPermissionsAndProhibitions(license1:, license2:),
    ~HaveCommonPermissionsAndProhibitions(license2:, license1:),
    ~HaveCommonDutiesAndProhibitions(license1:, license2:),
    ~HaveCommonDutiesAndProhibitions(license2:, license1:);
