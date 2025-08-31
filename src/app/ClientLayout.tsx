"use client"
import LayoutProvider from '@/components/LayoutProvider';
import WrapMessage from '@/components/WrapMessage';
import { UserProvider } from '@/context/useUserContext';
import { useGetMaintenanceMode } from '@/hooks/maintenance';
import { ReactQueryClientProvider } from '@/provider/ReactQueryClientProvider';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider, ThemeConfig } from 'antd';
import { usePathname } from 'next/navigation';
import MaintenanceGuard from '@/components/MaintenanceGuard';
import { useAllConfigs } from '@/hooks/config';
import { useEffect } from 'react';

function PathChecker({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDisplayMenu = pathname?.includes('/seller') && !pathname?.includes('seller-policy');

  if (isDisplayMenu) {
    return <LayoutProvider>{children}</LayoutProvider>;
  }
  return <>{children}</>;
}

function ConfigLoader() {
  const { configsData, isLoading } = useAllConfigs();
  
  useEffect(() => {
    if (configsData) {
      console.log(configsData.data);
    }
  }, [configsData]);
  
  return null;
}

function SmartsuppChat() {
  const { configsData } = useAllConfigs();
  
  useEffect(() => {
    if (configsData?.data) {
      const cskhConfig = configsData.data.find((config: any) => config.key === 'CSKH' && config.isActive);
      
      if (cskhConfig && typeof window !== 'undefined') {
        if (cskhConfig.key === 'CSKH') {
          try {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            
            script.innerHTML = `
              var _smartsupp = _smartsupp || {};
              _smartsupp.key = '${cskhConfig.value}';
              window.smartsupp||(function(d) {
                var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
                s=d.getElementsByTagName('script')[0];c=d.createElement('script');
                c.type='text/javascript';c.charset='utf-8';c.async=true;
                c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
              })(document);
            `;
            
            document.head.appendChild(script);
            
            if (cskhConfig.value.includes('<noscript>')) {
              const noscriptContent = document.createElement('div');
              noscriptContent.innerHTML = cskhConfig.value.match(/<noscript>([\s\S]*?)<\/noscript>/)?.[1] || '';
              if (noscriptContent.innerHTML.trim()) {
                const noscript = document.createElement('noscript');
                noscript.innerHTML = noscriptContent.innerHTML;
                document.body.appendChild(noscript);
              }
            }
          } catch (error) {
            console.error('Error initializing Smartsupp chat:', error);
          }
        } else {
          // Handle other types of chat widgets or content
          try {
            // Create a container div
            const container = document.createElement('div');
            container.innerHTML = cskhConfig.value;
            
            // Extract and execute all scripts
            const scripts = container.querySelectorAll('script');
            scripts.forEach(script => {
              const newScript = document.createElement('script');
              
              // Copy all attributes
              Array.from(script.attributes).forEach(attr => {
                newScript.setAttribute(attr.name, attr.value);
              });
              
              // Set the script content
              newScript.innerHTML = script.innerHTML;
              
              // Append to document
              document.body.appendChild(newScript);
            });
            
            // Add any HTML content that's not a script
            const htmlContent = document.createElement('div');
            htmlContent.innerHTML = cskhConfig.value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
            
            // Only append if there's actual content (not just whitespace)
            if (htmlContent.innerHTML.trim()) {
              document.body.appendChild(htmlContent);
            }
          } catch (error) {
            console.error('Error initializing chat:', error);
          }
        }
      }
    }
  }, [configsData]);
  
  return null;
}

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme: ThemeConfig = {
    token: {
      fontSize: 14,
      colorPrimary: '#0F172A',
      borderRadius: 12,
      controlHeight: 40,
      colorTextPlaceholder: '#636364',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    },
    components: {
      Steps: {
        dotSize: 17,
        dotCurrentSize: 17,
      },
      Dropdown: {
        paddingBlock: 4,
      },
    },
  };
 
  return (
    <ReactQueryClientProvider>
      <html suppressHydrationWarning>
        <body suppressHydrationWarning>
          <AntdRegistry>
            <ConfigProvider theme={theme}>
              <UserProvider>
                <WrapMessage>
                  <MaintenanceGuard>
                    <ConfigLoader />
                    <SmartsuppChat />
                    <PathChecker>
                      {children}
                    </PathChecker>
                  </MaintenanceGuard>
                </WrapMessage>
              </UserProvider>
            </ConfigProvider>
          </AntdRegistry>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
} 