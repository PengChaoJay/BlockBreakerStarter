"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TS_BaseGun_1 = require("./Base/TS_BaseGun");
const UE = require("ue");
require("./Base/ObjectExt");
class TS_Rifle extends TS_BaseGun_1.default {
    Constructor() {
        this.MaxBulletDistance = 5000;
        this.Damage = 2;
        this.FireRate = 0.1;
        this.PS_BulletImpact = UE.ParticleSystem.Load("/Game/BlockBreaker/ParticleSystems/PS_BulletImpact");
        this.GunMesh = this.CreateDefaultSubobjectGeneric('GunMesh', UE.StaticMeshComponent.StaticClass());
        this.GunMesh.StaticMesh = UE.StaticMesh.Load('/Game/BlockBreaker/Meshes/SM_Rifle');
        this.RootComponent = this.GunMesh;
    }
}
exports.default = TS_Rifle;
//# sourceMappingURL=TS_Rifle.js.map