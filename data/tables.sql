CREATE TABLE Actions(
    Id INTEGER PRIMARY KEY,
    Origin TEXT,
    Name TEXT,
    Description TEXT
);

CREATE TABLE Licenses(
    Id INTEGER PRIMARY KEY,
    Name TEXT,
    ShortName TEXT,
    SourceLink TEXT,
    Description TEXT
);

CREATE TABLE Permissions(
    Id INTEGER PRIMARY KEY,
    ActionId INTEGER,
    LicenseId INTEGER,
    Description TEXT,
    FOREIGN KEY (ActionId) REFERENCES Actions(Id),
    FOREIGN KEY (LicenseId) REFERENCES Licenses(Id)
);

CREATE TABLE Prohibitions(
    Id INTEGER PRIMARY KEY,
    ActionId INTEGER,
    LicenseId INTEGER,
    Description TEXT,
    FOREIGN KEY (ActionId) REFERENCES Actions(Id),
    FOREIGN KEY (LicenseId) REFERENCES Licenses(Id)
);

CREATE TABLE Duties(
    Id INTEGER PRIMARY KEY,
    ActionId INTEGER,
    LicenseId INTEGER,
    Description TEXT,
    FOREIGN KEY (ActionId) REFERENCES Actions(Id),
    FOREIGN KEY (LicenseId) REFERENCES Licenses(Id)
);

CREATE TABLE ShareAlikes(
    Id INTEGER PRIMARY KEY,
    LicenseId1 INTEGER,
    LicenseId2 INTEGER,
    Description TEXT,
    FOREIGN KEY (LicenseId1) REFERENCES Licenses(Id)
    FOREIGN KEY (LicenseId2) REFERENCES Licenses(Id)
)