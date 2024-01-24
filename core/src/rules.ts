import { License, LicenseAction, LicenseSummary, ShareAlikes } from "./types";

class Rules {
    static conformToShareAlike(license1: LicenseSummary, license2: LicenseSummary): boolean {
        if (license1.shareAlikes.length == 0)
        return true;

        return license1.shareAlikes.filter((shareAlike: ShareAlikes) => shareAlike.licenseId2 == license2.metaInformation.id).length >= 1;
    }

    static conformToRelicense(license1: LicenseSummary, license2: LicenseSummary): boolean {
        let isTheSameLicense = (license1.metaInformation.id === license2.metaInformation.id);
    
        if (isTheSameLicense)
            return true;

        let license1AllowsRelicensing = this.containsRelicensing(license1.permissions) && !this.containsRelicensing(license1.prohibitions);
        if (!license1AllowsRelicensing) {
            return false;
        }

        let license2AllowsRelicensing = this.containsRelicensing(license2.permissions) && !this.containsRelicensing(license2.prohibitions);

        return license2AllowsRelicensing;
    }
    
    private static containsRelicensing(actions: LicenseAction[]): boolean {
        return actions.filter((action: LicenseAction) => action.id === 27).length === 0;
    }
}

export { Rules }