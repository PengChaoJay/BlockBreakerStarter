import TS_BaseGun from "./Base/TS_BaseGun";
import * as UE from 'ue'
import './Base/ObjectExt'

class TS_Rifle extends TS_BaseGun{
    Constructor(){
        this.MaxBulletDistance = 5000;
        this.Damage = 2;
        this.FireRate = 0.1;
        this.PS_BulletImpact = UE.ParticleSystem.Load("/Game/BlockBreaker/ParticleSystems/PS_BulletImpact");
        
        this.GunMesh = this.CreateDefaultSubobjectGeneric<UE.StaticMeshComponent>('GunMesh',UE.StaticMeshComponent.StaticClass());
        this.GunMesh.StaticMesh = UE.StaticMesh.Load('/Game/BlockBreaker/Meshes/SM_Rifle');
        this.RootComponent = this.GunMesh;
    }
}
export default TS_Rifle;