"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const puerts_1 = require("puerts");
const UE = require("ue");
class TS_BaseGun extends UE.Actor {
    Constructor() {
        this.PS_BulletImpact = UE.ParticleSystem.Load("/Game/BlockBreaker/ParticleSystems/PS_BulletImpact");
    }
    //@no-blueprint
    Shoot(StartLocation, EndLocation) {
        let hitResultOut = puerts_1.$ref(undefined);
        if (UE.KismetSystemLibrary.LineTraceSingle(this, StartLocation, EndLocation, 0, false, undefined, 0, hitResultOut, true, undefined, undefined, 0.2)) {
            let hitResult = puerts_1.$unref(hitResultOut);
            UE.GameplayStatics.SpawnEmitterAtLocation(this, this.PS_BulletImpact, hitResult.Location, new UE.Rotator(0, 0, 0), new UE.Vector(1, 1, 1), true, UE.EPSCPoolMethod.AutoRelease, true);
            if (hitResult.HitObjectHandle) {
                UE.GameplayStatics.ApplyDamage(hitResult.Component.GetOwner(), this.Damage, undefined, undefined, undefined);
            }
        }
    }
}
exports.default = TS_BaseGun;
//# sourceMappingURL=TS_BaseGun.js.map