import { Header } from "@/components/Header";
import { ProfileHeader } from "@/components/ProfileHeader";
import { ProfileTabs } from "@/components/ProfileTabs";
import { ProfileSidebar } from "@/components/ProfileSidebar";
import { Feed } from "@/components/Feed";
import { Butterfly3D } from "@/components/Butterfly3D";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Butterfly3D />
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          <ProfileHeader />
          
          <ProfileTabs />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <ProfileSidebar />
            </div>
            
            <div className="lg:col-span-2">
              <Feed />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
