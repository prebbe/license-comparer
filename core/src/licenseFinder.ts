// Copyright 2024 Philip Rebbe

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

// http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import License from './entities/License';
import DataAccess from './dataAccess';

class LicenseFinder {
    db: DataAccess;

    constructor() {
        this.db = new DataAccess();
    }

    getLicenses() : License[] {
        return this.db.licenses;
    }

    getLicense(name: string) : License | undefined {
        return this.db.licenses.find((license) => license.metaInformation.name == name);
    }
    
    getLicenseById(id: number): License | undefined {
        return this.db.licenses.find((license) => license.metaInformation.id == id);
    }
}

export default LicenseFinder;